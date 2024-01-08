<script lang="ts">
	import { localStateManager as lsm } from '../../stores/localStateManager';
	import { onMount } from 'svelte';
	import RadioPanel from '../survey/RadioPanel.svelte';

	let storedConsent: boolean;
	const radioId = 'consent';
	const radioContent = ['I consent', 'I do not consent'];

	$: console.log('storedConsent', lsm.getItem('consent'));

	function updateConsent() {
		storedConsent = lsm.getItem('consent') === true ? true : false;
	}

	// Call updateConsent whenever the component is mounted
	onMount(updateConsent);

	const handleSelect = (radioId: string, value: string) => {
		//whenever the user selects a radio button, update storedConsent
		console.log('handleSelect', radioId, value);
		storedConsent = value === 'I consent' ? true : false;
	};

	const onSubmit = () => {
		//on submit, store consent in local storage and close dialog
		lsm.setItem('consent', storedConsent);
		if (!storedConsent) {
			alert('You must consent to participate in this study');
			return;
		}
		dialog.close();
	};

	let dialog: HTMLDialogElement; // HTMLDialogElement

	$: if (dialog && !storedConsent) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog}>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<form on:submit|preventDefault={onSubmit}>
			<h1>Consent form</h1>
			<hr />
			<div class="info">
				We welcome you to participate in this research project about games and cognitive decline.

				<h3>The project</h3>
				<p>
					This research project is part of a master's study at the <b
						>Department of Information and Media Science</b
					>
					at the <b>university of Bergen</b>
				</p>
				<p>
					This project aims to identify and overcome key obstacles related to designing and creating
					gamified cognitive assessments
				</p>

				<h3>Your participation</h3>
				<p>You will be asked to complete a series of tasks and answer a questionaire.</p>
				<p>The tasks will take about 6 minutes to complete.</p>
				<p>Complete the tasks in one sitting.</p>
				<p>
					You will also be asked to answer a questionaire about your experience with the tasks and
					the project
				</p>
				<p>The questionaire will take about 5 minutes to complete.</p>

				<h3>Handling and storage of your data</h3>
				<p>
					We will only use your personal data for the purpose(s) specified in this information
					letter and we will do so in accordance with the General Data Protection Regulation and
					Personal Data Act.
				</p>
				<p>
					Only the student and the supervisor of the project will have access to personal
					information such as name, age, gender, expertise, etc.
				</p>
				<p>
					Your data will be stored on <b>UiB servers</b>. The project is scheduled to end on June 1,
					2024, one month afterwhich your data will be deleted.
				</p>

				<h3>Your rights</h3>
				<ul>
					<li>access the personal data that is being processed about you</li>
					<li>request that your personal data is deleted</li>
					<li>request that incorrect personal data about you is corrected</li>
					<li>recieve a copy of your personal data (data portabliity)</li>
					<li>
						send a complaint to the <b>Data Protection Officer</b> or
						<b>The Norwegian Data Protection Authority</b>
						regarding the processing of your personal data
					</li>
				</ul>
			</div>
			<hr />

			<RadioPanel
				on:select={(e) => handleSelect('consent', e.detail)}
				{radioId}
				{radioContent}
				horizontal={false}
				showInside={false}
			/>
			<button type="submit">submit</button>

			<!-- svelte-ignore a11y-autofocus -->
		</form>
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
