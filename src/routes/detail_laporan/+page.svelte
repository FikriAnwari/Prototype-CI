<script>
    import { laporanState } from "$lib/laporan.svelte.js";
    const report = laporanState.selectedReport;

    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov'];

    function isVideo(fileName) {
        // Ambil kata setelah titik terakhir dan ubah jadi huruf kecil
        const extension = fileName.split('.').pop().toLowerCase();
        return videoExtensions.includes(extension);
    }

</script>

<!-- TopAppBar -->
<header class="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-5 h-16 w-full fixed top-0 z-50">

<a href="/">
<div class="flex items-center gap-4">
<button class="active:scale-95 transition-transform text-blue-600 dark:text-blue-400">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<h1 class="font-['Public_Sans'] font-semibold text-sm text-blue-600 dark:text-blue-400">Detail Laporan</h1>
</div>
</a>

<button class="active:scale-95 transition-transform text-blue-600 dark:text-blue-400">
<span class="material-symbols-outlined">search</span>
</button>
</header>
<!-- Main Content Area -->
<main class="flex-grow pt-16 pb-32">
<!-- Hero Media -->
<div class="w-full h-72 overflow-hidden relative">
<img alt="Flooded street" class="w-full h-full object-cover" data-alt="A wide-angle, cinematic photograph of a residential street in Jakarta heavily flooded with muddy brown water reaching knee-height. Submerged cars and parked motorcycles are visible under a gray, overcast sky. The lighting is diffused and somber, emphasizing the calm but urgent crisis. The visual style is modern and clean, consistent with a high-end emergency response application interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzQ7w9bjCRT7O3EJu2dkFcl1ijDI5u_YbkG1KEQH9xvB_e144xMsv6FVY8kEjQi4RAjR4RCbZLfBajyxrROCid3Hst3foikKiD60-U5am9TDhQ2iTzwhbdadlFuBRq9Os4sWuBcFn-1gpe48OSKExBEopZp3VnTh6TG1cTFV2z0yB_GJrPAtmzevTGOCeGti6sY-JBm6gpZ44XBllU6e-leg0qwA9M1d08H2h5e_P4JuTi6R1hWPWfoL1Govztxiaqew2oL2MvZA"/>
<div class="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                Live Report
            </div>
</div>
<!-- Content Card -->
<div class="px-container-margin -mt-8 relative z-10">
<div class="bg-white rounded-[20px] p-lg shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] border border-slate-100">
<div class="flex justify-between items-start mb-sm">
<h2 class="font-headline-md text-headline-md text-on-surface">Jl. Kemang Raya No. 12</h2>
<span class="text-label-caps font-label-caps text-secondary">{report.waktu.replaceAll('.',':')}</span>
</div>
<div class="flex items-center gap-2 text-primary mb-lg">
<span class="material-symbols-outlined text-[20px]" data-icon="location_on">location_on</span>
<span class="font-body-md text-body-md">Mampang Prapatan, Jakarta Selatan</span>
</div>
<!-- Description Section -->
<div class="mb-lg">
<h3 class="font-label-caps text-label-caps text-secondary mb-sm uppercase tracking-wider">Deskripsi Laporan</h3>
<p class="font-body-md text-body-md text-on-surface-variant">
                       {report.deskripsi}
                    </p>
</div>
<!-- Map Section -->
<div>
<h3 class="font-label-caps text-label-caps text-secondary mb-sm uppercase tracking-wider">Lokasi Map (*belum real)</h3>
<div class="w-full h-48 rounded-xl overflow-hidden border border-outline-variant bg-surface-container relative">
<img alt="Map location" class="w-full h-full object-cover" data-alt="A high-contrast digital map interface showing a detailed street grid of Jakarta Selatan. A prominent blue circular marker with a soft pulse effect indicates a specific location on Kemang Raya. The map style is minimalist and corporate, using a palette of soft grays, whites, and brand-consistent blues. The lighting is digital and clean, representing a high-tech surveillance or reporting tool." data-location="Jakarta Selatan" src="peta.png"/>
<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
<div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
<div class="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
</div>
</div>
</div>
</div>

<!-- video and images sections -->
{#if report.files.length !== 0}
    {#each report.files as file}
        <div class="mb-4">
            <h3 class="font-label-caps text-label-caps text-secondary mb-sm uppercase tracking-wider">
                Media Lampiran: {file.name}
            </h3>
            
            <div class="w-full rounded-xl overflow-hidden border border-outline-variant bg-black relative">
                {#if isVideo(file.name)}
                    <!-- Jika Video -->
                    <video controls class="w-full h-auto max-h-64 mx-auto">
                        <source src={file.url} />
                        Browser kamu tidak mendukung video.
                    </video>
                {:else}
                    <!-- Jika Gambar -->
                    <img 
                        src={file.url}
                        alt="Lampiran" 
                        class="w-full h-full object-contain max-h-64"
                    />
                {/if}
            </div>
        </div>
    {/each}
{/if}


</div>
</div>
<!-- Primary Action Button -->
<div class="px-container-margin mt-lg mb-lg">
<button class="w-full h-14 bg-primary text-white rounded-full font-headline-md text-body-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">share</span>
                Bagian ke WhatsApp
            </button>
</div>
</main>
<!-- Bottom Navigation Bar -->
<nav class="fixed bottom-0 left-0 w-full h-20 z-50 flex justify-around items-center px-4 pb-safe bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shadow-[0_-4px_20px_0_rgba(0,0,0,0.05)]">
<!-- Active Tab: Home -->
<a href="/">
<div class="flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20 rounded-xl px-3 py-1 active:scale-90 transition-all duration-200">
<span class="material-symbols-outlined" data-icon="home" style="font-variation-settings: 'FILL' 1;">home</span>
<span class="font-['Public_Sans'] text-[12px] font-medium">Home</span>
</div>
</a>

<!-- Inactive Tab: Report -->
<a href="/buat_laporan">
<div class="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-300 active:scale-90 transition-all duration-200">
<span class="material-symbols-outlined" data-icon="add_circle">add_circle</span>
<span class="font-['Public_Sans'] text-[12px] font-medium">Report</span>
</div>
</a>

<a href="/notifikasi">
<!-- Inactive Tab: Alerts -->
<div class="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-300 active:scale-90 transition-all duration-200">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
<span class="font-['Public_Sans'] text-[12px] font-medium">Alerts</span>
</div>
</a>

<a href="/profile">
<!-- Inactive Tab: Profile -->
<div class="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-300 active:scale-90 transition-all duration-200">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-['Public_Sans'] text-[12px] font-medium">Profile</span>
</div>
</a>
</nav>

<style>
    :global(body){
        @apply bg-surface text-on-surface min-h-screen flex flex-col;
    }
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
</style>