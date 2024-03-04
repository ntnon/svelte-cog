<script lang="ts">
	export let title = '';
	export let message = '';
	export let onSubmit = () => {
		dialog.close();
	};
	export let showDialog = false;

	$: if (dialog && showDialog) dialog.showModal();

	let dialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<form on:submit|preventDefault={onSubmit}>
			<h1>{title}</h1>
			<hr />
			<div class="info">
				{message}
			</div>
			<slot />
			<!-- ... rest of your code ... -->
			<button>Close</button>
		</form>
	</div>
</dialog>
