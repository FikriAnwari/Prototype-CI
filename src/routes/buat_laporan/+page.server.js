import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();

            // Ambil data pendukung nama file
            const namesString = formData.get('names') || "";
            const namesArray = namesString.split(',');
            const uuidString = formData.get('uuidNames') || "no-uuid";

            // Ambil semua berkas
            const files = formData.getAll('berkas');

            const uploadDir = join(process.cwd(), 'static', 'uploads');
            mkdirSync(uploadDir, { recursive: true });

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                
                // Cek apakah file benar-benar ada isinya
                if (file instanceof File && file.size > 0) {
                    // AMAN: Jika namesArray[i] kosong, gunakan nama asli file
                    const namaAsliAtauCustom = namesArray[i] || file.name;
                    
                    // Gabungkan UUID dengan nama
                    const namaCustom = `${uuidString}_${namaAsliAtauCustom}`;
                    
                    const filePath = join(uploadDir, namaCustom);
                    const buffer = Buffer.from(await file.arrayBuffer());
                    
                    writeFileSync(filePath, buffer);
                    console.log(`✅ Tersimpan: ${namaCustom}`);
                }
            }

            return { success: true, message: "Laporan berhasil diunggah!" };
        } catch (error) {
            console.error("❌ Error Server:", error);
            return { success: false, message: "Gagal mengunggah laporan." };
        }
    }
};
