<script>
    import { laporanState, selectReport } from "$lib/laporan.svelte.js";
    import { goto } from "$app/navigation";
</script>

<!-- Container Peta (Wajib relative) -->
<div class="relative w-full h-screen overflow-hidden">
    
    <!-- Gambar Peta aslimu -->
    <img src="peta-jakarta.png" class="w-full h-full object-cover" alt="peta" />

    <!-- Loop data dari Global State -->
    {#each laporanState.reports as report}
        <div 
            class="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
            style="left: {report.lokasi.x}%; top: {report.lokasi.y}%;"
            onclick={()=>{
                selectReport(report);
                goto('/detail_laporan');
            }}
        >
            <!-- Logika Warna: Merah untuk Banjir, Kuning untuk Potensi -->
            {#if report.jenis === 'banjir'}
                <div class="relative flex items-center justify-center">
                    <div class="absolute w-10 h-10 bg-error opacity-20 rounded-full animate-ping"></div>
                    <div class="bg-error text-white p-2 rounded-full shadow-lg border-2 border-white">
                        <span class="material-symbols-outlined block">flood</span>
                    </div>
                </div>
            {:else}
                <div class="bg-[#FFCC00] text-black p-2 rounded-full shadow-lg border-2 border-white">
                    <span class="material-symbols-outlined block">warning</span>
                </div>
            {/if}

            <!-- Tooltip saat di-hover (Opsional) -->
            <div class="hidden group-hover:block absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white p-2 rounded shadow-md text-xs whitespace-nowrap">
                {report.deskripsi}
            </div>
        </div>
    {/each}

</div>
