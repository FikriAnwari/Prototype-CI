<script>
    import Marker from "$lib/assets/Marker.svelte";
</script>

<header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between px-5 h-16 w-full fixed top-0 z-50">
<div class="flex items-center gap-sm">
<span class="material-symbols-outlined text-blue-600 dark:text-blue-400" data-icon="location_on">location_on</span>
<span class="font-['Public_Sans'] font-semibold text-sm text-on-surface">Current Location</span>
</div>
<div class="flex items-center gap-md">
<button class="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors p-2 rounded-full active:scale-95 transition-transform">
<span class="material-symbols-outlined text-slate-500 dark:text-slate-400" data-icon="search">search</span>
</button>
</div>
</header>
<!-- Main Content Canvas (Full Screen Map Focus) -->
<main class="relative h-screen w-full pt-16 pb-20">

    <Marker/>

<!-- Interactive Map Background -->
<div class="absolute inset-0 z-0">
<img class="w-full h-full object-cover grayscale-[0.2] brightness-[0.95]" data-alt="A highly detailed topographical map of a metropolitan coastal city with intricate street patterns and water bodies. The aesthetic is clean and modern, using a muted color palette of soft greys and pale blues. Subtle digital overlays suggest data points and connectivity, maintaining a professional and calm guardian persona for a disaster management application. The lighting is bright and even, simulating a daylight light-mode user interface." data-location="Jakarta" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMB0oHnEKNufwtc0FOjvFXkSdSX84osS6BiwrvZsXDPC6fHkxVIUWrBrwYYlOhSAdwtri2qNDlulKKhDmDO1nKFS5pcZbxduSgvHb9nmUvASMXHXnueRp7Mk--A3meOclnSTeqLNCM-UyqxzwDo0iW3r9GD1niZG4a7juL9i4b6xiV87VGfCIi3JPL1e1vOWYqOhcLHB9CnNCtxFqycvjT788MqCV_w4Ko1jhghOcHimyoEudNFVmV-2EvbAeaK8qfVIgwMxh4HQ"/>
<!-- Map Markers -->
<!-- Active/Dangerous Marker (Red) -->
<div class="absolute top-[40%] left-[30%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
<div class="relative flex items-center justify-center">
<div class="absolute w-12 h-12 bg-error opacity-20 rounded-full animate-ping"></div>
<div class="z-10 bg-error text-white p-2 rounded-full shadow-lg border-2 border-white">
<span class="material-symbols-outlined block" data-icon="flood" style="font-variation-settings: 'FILL' 1;">flood</span>
</div>
</div>
</div>
<!-- Potential/Rising Marker (Yellow) -->
<div class="absolute top-[60%] left-[65%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
<div class="z-10 bg-[#FFCC00] text-on-tertiary-fixed p-2 rounded-full shadow-lg border-2 border-white">
<span class="material-symbols-outlined block" data-icon="warning" style="font-variation-settings: 'FILL' 1;">warning</span>
</div>
</div>
<!-- Active/Dangerous Marker 2 (Red) -->
<div class="absolute top-[25%] left-[55%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
<div class="relative flex items-center justify-center">
<div class="absolute w-10 h-10 bg-error opacity-20 rounded-full animate-ping"></div>
<div class="z-10 bg-error text-white p-2 rounded-full shadow-lg border-2 border-white">
<span class="material-symbols-outlined block" data-icon="flood" style="font-variation-settings: 'FILL' 1;">flood</span>
</div>
</div>
</div>
</div>
<!-- Legend Overlay (Pojok Atas) -->
<div class="absolute top-20 left-container-margin z-10">
<div class="bg-white/90 backdrop-blur-md p-md rounded-xl shadow-sm border border-slate-200/50 max-w-[200px]">
<h3 class="font-label-caps text-label-caps text-on-surface-variant mb-sm">LEGENDA</h3>
<div class="space-y-sm">
<div class="flex items-center gap-sm">
<span class="w-3 h-3 rounded-full bg-error"></span>
<span class="font-body-md text-[14px] text-on-surface">Banjir Aktif</span>
</div>
<div class="flex items-center gap-sm">
<span class="w-3 h-3 rounded-full bg-[#FFCC00]"></span>
<span class="font-body-md text-[14px] text-on-surface">Potensi Banjir</span>
</div>
</div>
</div>
</div>
<!-- Floating Action Button (FAB) -->
<a href="/buat_laporan">
<button class="fixed bottom-24 right-container-margin z-50 w-16 h-16 bg-primary-container text-on-primary-container rounded-full shadow-xl flex items-center justify-center active:scale-90 transition-all duration-200">
<span class="material-symbols-outlined text-[32px]" data-icon="add">add</span>
</button>
</a>
<!-- Floating Cards/Quick Info (Asymmetric Layout) -->
<div class="absolute bottom-24 left-container-margin right-24 z-10 pointer-events-none">
<div class="bg-white p-md rounded-xl border border-[#E5E5EA] shadow-[0_4px_20px_0_rgba(0,0,0,0.05)] flex items-center gap-md pointer-events-auto max-w-sm">
<div class="bg-primary-fixed-dim p-sm rounded-lg">
<span class="material-symbols-outlined text-primary" data-icon="info">info</span>
</div>
<div>
<p class="font-headline-md text-[16px] text-on-surface">Peringatan Dini</p>
<p class="font-body-md text-[12px] text-on-surface-variant">Kenaikan debit air di Pintu Air Manggarai (Siaga 3).</p>
</div>
</div>
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
        @apply bg-surface text-on-surface overflow-hidden;
    }
    .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
    .map-gradient {
        background: linear-gradient(to bottom, rgba(249, 249, 255, 0.8), rgba(249, 249, 255, 0));
    }

</style>