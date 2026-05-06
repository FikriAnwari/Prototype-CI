// src/lib/laporan.svelte.js
export const laporanState = $state({
    reports: [], // Gunakan nama 'reports' (typo fix)
    selectedReport: null
});

export function addLaporan(dataBaru) {
    // Mengambil snapshot dari dataBaru agar konsisten sebagai object biasa
    const cleanData = $state.snapshot(dataBaru);

    // Menambahkan data baru ke dalam array laporan yang sudah ada
    laporanState.reports = [...laporanState.reports, cleanData];
    console.log("Global State Updated:", laporanState.reports);
}

// Tambahkan fungsi untuk memilih laporan
export function selectReport(report) {
    laporanState.selectedReport = report;
}
