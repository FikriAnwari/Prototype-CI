<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<!-- head dari code.html -->
	<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
	<link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
	<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
	<script id="tailwind-config">
		tailwind.config = {
			darkMode: "class",
			theme: {
			extend: {
				"colors": {
						"primary-fixed-dim": "#adc6ff",
						"on-tertiary-fixed": "#351000",
						"on-primary-container": "#fefcff",
						"on-primary-fixed": "#001a41",
						"inverse-surface": "#2d3039",
						"surface-tint": "#005bc1",
						"secondary-container": "#dfdfe4",
						"error": "#ba1a1a",
						"tertiary-container": "#c64f00",
						"surface-bright": "#f9f9ff",
						"primary-fixed": "#d8e2ff",
						"tertiary": "#9e3d00",
						"on-secondary-fixed": "#1a1c1f",
						"on-tertiary-container": "#fffbff",
						"surface": "#f9f9ff",
						"surface-container-low": "#f1f3fe",
						"inverse-primary": "#adc6ff",
						"on-secondary-container": "#616267",
						"on-primary": "#ffffff",
						"secondary": "#5d5e63",
						"on-background": "#181c23",
						"background": "#f9f9ff",
						"tertiary-fixed-dim": "#ffb595",
						"secondary-fixed": "#e2e2e7",
						"surface-container-high": "#e6e8f3",
						"on-error-container": "#93000a",
						"primary": "#0058bc",
						"surface-container-lowest": "#ffffff",
						"on-surface-variant": "#414755",
						"error-container": "#ffdad6",
						"primary-container": "#0070eb",
						"on-surface": "#181c23",
						"on-tertiary": "#ffffff",
						"outline-variant": "#c1c6d7",
						"surface-variant": "#e0e2ed",
						"surface-container": "#ecedf9",
						"inverse-on-surface": "#eef0fc",
						"secondary-fixed-dim": "#c6c6cb",
						"on-tertiary-fixed-variant": "#7c2e00",
						"tertiary-fixed": "#ffdbcc",
						"surface-dim": "#d8d9e5",
						"outline": "#717786",
						"on-primary-fixed-variant": "#004493",
						"on-secondary": "#ffffff",
						"on-error": "#ffffff",
						"surface-container-highest": "#e0e2ed",
						"on-secondary-fixed-variant": "#45474b"
				},
				"borderRadius": {
						"DEFAULT": "0.25rem",
						"lg": "0.5rem",
						"xl": "0.75rem",
						"full": "9999px"
				},
				"spacing": {
						"xl": "32px",
						"xs": "4px",
						"unit": "4px",
						"sm": "8px",
						"container-margin": "20px",
						"md": "16px",
						"lg": "24px",
						"gutter": "16px"
				},
				"fontFamily": {
						"label-caps": ["Public Sans"],
						"headline-md": ["Public Sans"],
						"headline-lg": ["Public Sans"],
						"body-md": ["Public Sans"],
						"body-lg": ["Public Sans"]
				},
				"fontSize": {
						"label-caps": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "700"}],
						"headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
						"headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
						"body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
						"body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}]
				}
			},
			},
		}
		</script>



		<!-- style dari code.html -->
		 <style>
			:global(body) { 
				font-family: 'Public Sans', sans-serif; 
				min-height: max(884px, 100dvh);
			}
		 </style>
</svelte:head>

{@render children()}
