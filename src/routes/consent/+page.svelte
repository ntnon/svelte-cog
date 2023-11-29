<script lang="ts">
	let yes = false;
	function onSubmit(e: SubmitEvent) {
		if (!yes) {
			alert('You must consent to participate in the study');
			return;
		}
		window.location.href = '/';
	}
</script>

<form on:submit|preventDefault={onSubmit}>
	<div class="info">
		<h1>Consent form</h1>

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
			You will also be asked to answer a questionaire about your experience with the tasks and the
			project
		</p>
		<p>The questionaire will take about 5 minutes to complete.</p>

		<h3>Handling and storage of your data</h3>
		<p>
			We will only use your personal data for the purpose(s) specified in this information letter
			and we will do so in accordance with the General Data Protection Regulation and Personal Data
			Act.
		</p>
		<p>
			Only the student and the supervisor of the project will have access to personal information
			such as name, age, gender, expertise, etc.
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
	<div class="submit">
		<label for="consent"
			>I have read and understood the information above and consent to participate in the study</label
		>
		<input type="checkbox" bind:checked={yes} />
		<input type="submit" value="Send" />
	</div>
</form>

<style>
	.info {
		background: rgba(194, 61, 61, 0.233);
		max-width: 80%;
		margin-left: 2rem;
		margin-right: 2rem;
		padding: 1rem;
	}
	.submit {
		margin-left: 2rem;
		margin-right: 2rem;
	}
	form {
		padding-bottom: 7rem;
	}
	b {
		color: rgba(50, 30, 1, 0.885);
	}
</style>
