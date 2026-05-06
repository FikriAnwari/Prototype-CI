<script>
    import { laporanState, selectReport } from "$lib/laporan.svelte.js";
    import { goto } from "$app/navigation";

    function ubahWaktukeRentang(waktuKejadianStr){
        // 1. Pecah string menjadi Jam, Menit, dan Detik
        const [jam, menit, detik] = waktuKejadianStr.split('.').map(Number);

        // 2. Buat objek Date untuk "Hari Ini" dengan jam tersebut
        const waktuKejadian = new Date();
        waktuKejadian.setHours(jam, menit, detik, 0);

        const sekarang = new Date();

        // 3. Hitung selisih
        const selisihMS = sekarang - waktuKejadian;
        const selisihMenit = Math.floor(selisihMS / (1000 * 60));
        const selisihJam = Math.floor(selisihMS / (1000 * 60 * 60));

        // 4. Logika tampilan
        let tampilan;
        if (selisihMenit < 0) {
            return `${selisihMenit} menit yang lalu`;
        } else if (selisihMenit < 60) {
            return `${selisihMenit} menit yang lalu`;
        } else {
            return `${selisihJam} jam yang lalu`;
        }
    }
</script>

<!-- TopAppBar -->
<header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between px-5 h-16 w-full fixed top-0 z-50">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-blue-600 dark:text-blue-400" data-icon="location_on">location_on</span>
<h1 class="font-['Public_Sans'] font-semibold text-sm text-on-surface">Current Location</h1>
</div>
<div class="flex items-center gap-4">
<button class="active:scale-95 transition-transform">
<span class="material-symbols-outlined text-slate-500 dark:text-slate-400" data-icon="search">search</span>
</button>
</div>
</header>
<!-- Main Content -->
<main class="pt-20 pb-28 px-container-margin max-w-2xl mx-auto">
<section class="mb-lg">
<h2 class="font-headline-md text-headline-md text-on-surface mb-sm">Notifikasi</h2>
<p class="font-body-md text-body-md text-on-surface-variant">Update terbaru situasi banjir di sekitar Anda.</p>
</section>


<!-- Notification List -->
<div class="flex flex-col gap-md">


<!-- Alert Card: Active/Dangerous -->
{#if laporanState.reports !== null || laporanState.reports.length !== 0}
    {#each laporanState.reports.toReversed() as report}
        <div class="bg-white dark:bg-slate-800 rounded-xl p-md border border-[#E5E5EA] shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] relative overflow-hidden flex gap-md"
        onclick={()=>{
                selectReport(report);
                goto('/detail_laporan');
            }}
        >
        <div class="flex-shrink-0">
        <div class="w-12 h-12 rounded-full bg-error-container flex items-center justify-center">
        <span class={"material-symbols-outlined text-" + (report.jenis === "potensi banjir" ? "warning" : "error")}
 data-icon="warning" data-weight="fill" style="font-variation-settings: 'FILL' 1;">warning</span>
        </div>
        </div>
        <div class="flex-grow">
        <div class="flex justify-between items-start mb-1">
        <h3 class="font-headline-md text-body-lg font-bold text-on-surface">Peringatan Banjir di "*Nama Daerah"</h3>
        <span class={"w-3 h-3 rounded-full bg-"+ (report.jenis === "potensi banjir" ? "[#FFCC00]" : "[#FF3B30]") + ' mt-1'}></span>
        </div>
        <p class="font-body-md text-sm text-slate-500 mb-2">{ubahWaktukeRentang(report.waktu)}</p>
        <p class="font-body-md text-on-surface-variant">{report.deskripsi}</p>
        </div>
        </div>
    {/each}
{/if}


<!-- Alert Card: Potential/Rising -->
<div class="bg-white dark:bg-slate-800 rounded-xl p-md border border-[#E5E5EA] shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] flex gap-md">
<div class="flex-shrink-0">
<div class="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary" data-icon="error">error</span>
</div>
</div>
<div class="flex-grow">
<div class="flex justify-between items-start mb-1">
<h3 class="font-headline-md text-body-lg font-bold text-on-surface">Peringatan Banjir di Bekasi Timur</h3>
<span class="w-3 h-3 rounded-full bg-[#FFCC00] mt-1"></span>
</div>
<p class="font-body-md text-sm text-slate-500 mb-2">45 Menit yang lalu</p>
<p class="font-body-md text-on-surface-variant">Curah hujan tinggi terdeteksi di wilayah Bekasi Timur. Genangan setinggi 20-30cm mulai muncul di beberapa titik jalan.</p>
</div>
</div>
<!-- Visual Context: Area Map -->
<!-- <div class="rounded-xl overflow-hidden border border-[#E5E5EA] shadow-sm mb-2">
<div class="h-40 w-full relative">
<img class="w-full h-full object-cover" data-alt="A sophisticated digital map visualization of a metropolitan city area during a stormy night. The map features glowing blue data layers showing water levels and traffic flow, with pulsing red warning zones indicating flood-prone districts. The overall aesthetic is clean, professional, and high-tech, using a dark mode color palette with vibrant neon blue and orange accents for clarity." data-location="Jakarta" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1w2PEaYUN-h8MTzF2pLstIb63t0ETSgTPCjPhlFjK7kXR2HyUMWIF8L6iMjCYOgLL9fezxBe5vYTn_pmujpc50ZGe55-2OQIpACEC57cbO1s-E2ro_KlmezZVd_kFAqkPOOxGpQBfZbgaC39BDPpFrSPzp8k--z6-ry6e3KbxCqbytP3nb7SKeyKRtf4vSrnjw-HA-j_WnM2D_wYqS5Z5rc1DZheMiBF-LtFZXjjHli5GW-ernJC2VLujSW2QNra1iSHoR7vGFA"/>
<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
<span class="text-white font-label-caps text-label-caps uppercase">Live Monitoring: Jabodetabek</span>
</div>
</div>
</div> -->
<!-- Alert Card: Resolved/Clear -->
<div class="bg-white dark:bg-slate-800 rounded-xl p-md border border-[#E5E5EA] shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] flex gap-md">
<div class="flex-shrink-0">
<div class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="check_circle">check_circle</span>
</div>
</div>
<div class="flex-grow">
<div class="flex justify-between items-start mb-1">
<h3 class="font-headline-md text-body-lg font-bold text-on-surface">Peringatan Banjir di Tangerang</h3>
<span class="w-3 h-3 rounded-full bg-[#007AFF] mt-1"></span>
</div>
<p class="font-body-md text-sm text-slate-500 mb-2">2 Jam yang lalu</p>
<p class="font-body-md text-on-surface-variant">Genangan air di Jl. Raya Serpong telah surut sepenuhnya. Lalu lintas kembali normal dan aman dilalui kendaraan.</p>
</div>
</div>
<!-- Alert Card: Information -->
<div class="bg-white dark:bg-slate-800 rounded-xl p-md border border-[#E5E5EA] shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] flex gap-md opacity-80">
<div class="flex-shrink-0">
<div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
<span class="material-symbols-outlined text-secondary" data-icon="info">info</span>
</div>
</div>
<div class="flex-grow">
<div class="flex justify-between items-start mb-1">
<h3 class="font-headline-md text-body-lg font-bold text-on-surface">Update Cuaca Harian</h3>
<span class="w-3 h-3 rounded-full bg-slate-300 mt-1"></span>
</div>
<p class="font-body-md text-sm text-slate-500 mb-2">5 Jam yang lalu</p>
<p class="font-body-md text-on-surface-variant">BMKG memprediksi hujan intensitas sedang hingga lebat di wilayah Jabodetabek pada sore hari nanti.</p>
</div>
</div>
</div>
</main>
<!-- FAB: Report a Flood -->
<!-- <button class="fixed bottom-24 right-5 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-all duration-200 z-40">
<span class="material-symbols-outlined text-3xl" data-icon="add">add</span>
</button> -->

<!-- BottomNavBar -->
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
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }

</style>