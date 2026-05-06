<script>
  import { 
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader 
  } from '@sveltestrap/sveltestrap';

  import "bootstrap/dist/css/bootstrap.min.css";
 
  let {open, onConfirm, onCancel} = $props();

    // State untuk menyimpan koordinat yang dipilih
  let koordinat = $state({ x: 0, y: 0, pctX: 0, pctY: 0 });

  function ambilKoordinat(event) {
    const rect = event.target.getBoundingClientRect();
    
    // 1. Koordinat dalam Pixel (relatif terhadap gambar)
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // 2. Koordinat dalam Persen (agar responsif)
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;

    koordinat = { x, y, pctX, pctY };
    
    console.log(`Titik diklik: ${pctX.toFixed(2)}% , ${pctY.toFixed(2)}%`);
  }
</script>

<Modal isOpen={open} fullscreen>
  <ModalHeader>Modal title</ModalHeader>
    <ModalBody class="text-center p-0 overflow-hidden bg-light">
    <div class="position-relative d-inline-block">

        <img 
        src="peta.png" 
        alt="peta" 
        class="img-fluid border shadow-sm cursor-crosshair"
        onclick={ambilKoordinat}
        />

        <!-- Simulasi Marker (Titik Merah) -->
        {#if koordinat.pctX > 0}
          <div 
            class="position-absolute bg-danger border border-white rounded-circle shadow"
            style="width: 15px; height: 15px; left: {koordinat.pctX}%; top: {koordinat.pctY}%; transform: translate(-50%, -50%);"
          ></div>
        {/if}
    </div>

    <!-- <div class="mt-3 text-muted">
        <small>Koordinat Terpilih: X={koordinat.pctX.toFixed(2)}%, Y={koordinat.pctY.toFixed(2)}%</small>
    </div> -->

    </ModalBody>
    <ModalFooter>
      <Button color="primary" onclick={()=>{onConfirm(koordinat.pctX, koordinat.pctY)}}>Pilih Titik</Button>
      <Button color="secondary" onclick={onCancel}>Cancel</Button>
    </ModalFooter>
  </Modal>