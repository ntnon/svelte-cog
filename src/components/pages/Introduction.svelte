<script lang="ts">
	import Stage from '../Stage.svelte';
	import NextButton from '../NextButton.svelte';
</script>

<Stage>
	<span slot="name">Welcome to the online MCI test!</span>
	<span slot="info">Complete the tasks, earn points. There are 6 unique tasks</span>
	<span slot="component" class=" size-full flex-col center space-y-10 text-xl p-16">
		<p>
			Mild Cognitive Impairment <i>can</i> lead to worsening cognitive health, but in most cases it does
			not.
		</p>
		<p>The purpose of this website is to help you understand your cognitive health</p>
		<p><b>NB: </b>This website cannot diagnose or improve your cognitive health you.</p>
		<b>
			If you are concerned about your cognitive health, please consult a healthcare professional.
		</b>

		<p>The first task is to press the 'next' button when you are ready to move on!</p>
	</span>
	<NextButton label="ok" slot="next" />
</Stage>
