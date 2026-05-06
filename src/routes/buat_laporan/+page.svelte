<script>
    import { enhance } from "$app/forms";
    import Peta from "$lib/assets/Peta.svelte";
    import { addLaporan } from "$lib/laporan.svelte.js";
    import { goto } from '$app/navigation';

    let jenisLaporan = $state("banjir");
    let deskripsi = $state("");
    let lokasi = $state({x:0, y:0});
    let files = $state();
    let filesName = $state();
    let filesPreview = $state([]);
    let uuid = $state("");
    $effect(() => {
        uuid = crypto.randomUUID();
    });

    function handlerPilihJenisLaporan(jenis){
        jenisLaporan = jenis;
    }

    $effect(()=>{
        if(files && files.length > 0){
            const fileArray = Array.from(files);

            // nama file (tetap dipakai untuk server)
            filesName = fileArray.map(file => file.name);

            // PREVIEW URL (ini yang baru)
            filesPreview = fileArray.map(file => ({
                name: file.name,
                url: URL.createObjectURL(file)
            }));

        }else{
            filesName = [];
            filesPreview = [];
        }
    });

    $effect(()=>{
        console.log(jenisLaporan);
        console.log(deskripsi);
        console.log(filesName);
    })

    let modalPeta = $state(false);
    function togglePeta(){
        modalPeta = !modalPeta;
    }

    function modalPetaCancel(){
        modalPeta = false;
    }

    function modalPetaConfirm(callbackX, callbackY){
        lokasi.x = callbackX;
        lokasi.y = callbackY;
        modalPeta = false;
    }

    function handleKirim() {
        return async ({ result }) => {
            if (result.type === 'success') {
                // Saat server berhasil simpan file, kita simpan datanya ke Global State
                addLaporan({
                    uuid: uuid,
                    jenis: jenisLaporan,
                    deskripsi: deskripsi,
                    lokasi: { ...lokasi },
                    files: filesPreview.map((file) => ({
                        name: `${uuid}_${file.name}`,
                        url: file.url
                    })),
                    waktu: new Date().toLocaleTimeString(),
                    konfirmasi: 0
                });
                
                alert("Laporan Berhasil Terkirim");
                // Opsional: Redirect ke halaman utama setelah lapor
                goto('/'); 
            }
        };
    }
    
</script>

<!-- Modal Peta -->
<Peta open={modalPeta} onConfirm={modalPetaConfirm} onCancel={modalPetaCancel}/>

<header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between px-5 h-16 w-full fixed top-0 z-50">
    <!-- {#if lokasi}
        <h1>{lokasi.x} {lokasi.y}</h1>
    {/if} -->
<div class="flex items-center gap-3">
<a href="/">
<button class="text-blue-600 dark:text-blue-400 active:scale-95 transition-transform">
<span class="material-symbols-outlined">arrow_back</span>
</button>
</a>
<h1 class="font-['Public_Sans'] font-semibold text-sm text-slate-800 dark:text-white">Buat Laporan</h1>
</div>
<div class="text-blue-600 dark:text-blue-400 font-bold text-lg">
<span class="material-symbols-outlined">info</span>
</div>
</header>
<main class="pt-20 px-container-margin max-w-md mx-auto">
<!-- Section Header -->
<div class="mb-lg">
<h2 class="font-headline-md text-headline-md text-on-surface mb-xs">Laporkan Kejadian</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Berikan informasi akurat untuk membantu tim tanggap darurat.</p>
</div>

<form class="space-y-lg" method="POST" enctype="multipart/form-data" use:enhance={handleKirim}>

<!-- input type hidden -->
<input type="hidden" name="names" value={filesName !== undefined ? filesName.join(',') : ""} />
<input type="hidden" name="uuidNames" value={uuid} />

<!-- Report Type Toggle -->
<div class="space-y-sm">
<label class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Jenis Laporan</label>
<div class="grid grid-cols-2 gap-md p-1 bg-surface-container rounded-xl">
<label class="cursor-pointer" onclick={()=>handlerPilihJenisLaporan("banjir")}>
<input checked="" class="hidden peer" name="report_type" type="radio" value="flood"/>
<div class="flex flex-col items-center justify-center p-md rounded-lg bg-transparent peer-checked:bg-white peer-checked:shadow-sm peer-checked:text-primary transition-all duration-200">
<span class="material-symbols-outlined mb-1">water_drop</span>
<span class="font-label-caps text-label-caps">Banjir</span>
</div>
</label>
<label class="cursor-pointer" onclick={()=>handlerPilihJenisLaporan("potensi banjir")}>
<input class="hidden peer" name="report_type" type="radio" value="potential"/>
<div class="flex flex-col items-center justify-center p-md rounded-lg bg-transparent peer-checked:bg-white peer-checked:shadow-sm peer-checked:text-tertiary transition-all duration-200">
<span class="material-symbols-outlined mb-1">warning</span>
<span class="font-label-caps text-label-caps">Potensi Banjir</span>
</div>
</label>
</div>
</div>
<!-- Map Picker Area -->
<div class="space-y-sm">
<div class="flex justify-between items-end">
<label class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Lokasi Kejadian</label>
<span class="text-primary font-label-caps text-[10px] flex items-center gap-1">
<span class="material-symbols-outlined text-[14px]">my_location</span> Gunakan Lokasi Saat Ini
                    </span>
</div>
<div class="relative w-full h-48 rounded-xl overflow-hidden border border-outline-variant group" onclick={togglePeta}>
<div class="absolute inset-0 bg-slate-200 animate-pulse"></div>
<img class="absolute inset-0 w-full h-full object-cover" data-alt="A clean, minimalist digital map interface showing a city street layout with a blue location pin in the center. The map style is modern with soft gray tones for roads and buildings, following a light mode aesthetic. A soft shadow defines the pin's position, creating depth against the flat cartography." data-location="Jakarta" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo3mFHsBMudV2vHqeXCcjSN99bQc8nPZMQ6R_6zrDlnPaV9K-mhyzWgH7hpTjkxCZn0D_lQ3MrhEAaB2i1DkbKHdXSb-KtbfCyoS5G1vkPQmC0ewO3lUtSjhQ8iTwpBKx6tEXfauxbN6x4e_-xNEwScZQN18wRXiLHezLxCrVzVjmKw7g3y_67r60HKQaybwJR9V5lrT9gvnjPi59Hv8cAfHN7aMSMeQzk3_cDOaf6WMUF-xIgE957OfCXvqU4VCmlpUoexqb9lQ"/>
<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
<span class="material-symbols-outlined text-primary text-4xl" style="font-variation-settings: 'FILL' 1;">location_on</span>
</div>
<div class="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-sm rounded-lg flex items-center gap-2 border border-outline-variant shadow-sm">
<span class="material-symbols-outlined text-sm text-on-surface-variant">near_me</span>
<span class="text-[12px] font-medium truncate text-on-surface">Jl. Thamrin No. 12, Jakarta Pusat</span>
</div>
</div>
</div>
<!-- Description -->
<div class="space-y-sm">
<label class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider" for="description">Deskripsi Singkat</label>
<textarea class="w-full bg-white border border-outline-variant rounded-xl p-md font-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline" id="description" placeholder="Ceritakan situasi terkini (kedalaman air, arus, dsb)..." rows="3" bind:value={deskripsi}></textarea>
</div>
<!-- Media Upload -->
<div class="space-y-sm">
<label class="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Foto / Video</label>

<br><input type="file" multiple id="fileInput" bind:files={files} name="berkas" />
<!-- <div class="grid grid-cols-3 gap-sm">
<button class="aspect-square border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center text-outline hover:bg-surface-container-low transition-colors" type="button">
<span class="material-symbols-outlined text-3xl">add_a_photo</span>
<span class="text-[10px] mt-1 font-bold">TAMBAH</span>
</button>
Mock Thumbnail
<div class="aspect-square rounded-xl overflow-hidden relative group shadow-sm">
<img class="w-full h-full object-cover" data-alt="A close-up shot of heavy rain falling onto a flooded urban street, capturing the ripples on the water's surface and the reflections of city lights. The aesthetic is documentary and serious, emphasizing the impact of a natural event. The lighting is diffused and cool-toned, maintaining a professional guardian persona for the UI context." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM1Gv3FhjFEXqhQHJyUT-BwjNk26NC-Hc9ga085mTirMj4mRLwFEtET7tvg0DKYpc5YBx7V3LzTw85v07cdCEXo6oArkC_CT7qIUy7sGS57T1iAMIjpHtDwogD89Ooe5Jlc7ZzwJnJfYEsQcyOSG9fXDV3bEGLcPS02jWhaN-JL1EP2teHSSQD1qxc42tJCmLILiHrCubGOE3nxyrtpVLV9NafkruqNiSkuoKEyKf2CWNcY_UI7vPZgNlIFPmMqWkXzJIlGGEkfA"/>
<button class="absolute top-1 right-1 bg-error text-white rounded-full p-1 shadow-md">
<span class="material-symbols-outlined text-xs">close</span>
</button>
</div>
</div> -->
<p class="text-[10px] text-on-surface-variant italic mt-1">* Maksimal 3 file (Foto/Video max 30s)</p>
</div>

<!-- Bottom Action Bar -->
<div class="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 px-container-margin pt-md pb-8 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] border-t border-slate-100 dark:border-slate-800 z-40">
<div class="max-w-md mx-auto">
<button class="w-full py-4 bg-primary text-white rounded-full font-bold text-lg shadow-lg shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-2" type="submit">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">send</span>
                Kirim Laporan
            </button>
</div>
</div>

</form>
</main>
<div style="height: 200px; width: auto;">
</div>


<style>
    :global(body){
        @apply bg-background text-on-background min-h-screen pb-32;
    }
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>