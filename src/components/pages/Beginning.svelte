<script lang="ts">
	import NavButton from '../NavButton.svelte';
	import Stage from '../Stage.svelte';
	import Dialog from '../Dialog.svelte';
	import Reward from '../Reward.svelte';
	import { getAppState } from '$lib/state.svelte';

	const rewards = getAppState().rewards;

	let currentStage: string = 'ice-cream'; //should be "initial"

	let enableNext: boolean = false;

	interface ICharacter {
		name: string;
		char: string;
		talkingSpeed: number;
	}

	let character: ICharacter = {
		name: 'Narrator',
		char: '',
		talkingSpeed: 1
	};

	let neighbor: ICharacter = {
		name: 'Neighbor',
		char: '🙋🏼‍♂️🍨',
		talkingSpeed: 1
	};
</script>

{#if currentStage === 'initial'}
	<Stage>
		<span slot="name" class="flex flex-row center"><span class="text-6xl">☀️</span> </span>
		<span slot="info" class={enableNext ? 'showInfoText' : 'opacity-0'}
			>{#if enableNext}
				What will you do?{/if}</span
		>
		<span slot="component"
			><b>Narrator: </b><Dialog
				on:complete={() => (enableNext = true)}
				speed={character.talkingSpeed}
				htmlString="You wake up to rays of sunshine warming your face through the window.<pause /> <br/>
                A perfect day.<pause /> <br/>
                You remember that a new bakery opens today, and it is giving out free bagels! If you hurry, you can make it in time.<pause /> <br/>
                "
			></Dialog></span
		>

		<span slot="next" class="multiNav {enableNext ? '' : 'opacity-0'}">
			<NavButton
				fn={() => {
					currentStage = 'reward';
					enableNext = false;
				}}>Free bagels</NavButton
			>
		</span>
	</Stage>
{/if}

{#if currentStage === 'journey'}
	<Stage>
		<span slot="name" class="flex flex-row center"><span class="text-6xl">☀️</span> </span>
		<span slot="info" class={enableNext ? 'showInfoText' : 'opacity-0'}
			>Which path do you choose?</span
		>
		<span slot="component"
			><b>{character.name}: </b><Dialog
				on:complete={() => (enableNext = true)}
				speed={character.talkingSpeed}
				htmlString="Looking at your usual route to the bakery, you see a wizard standing in the middle of the road.<pause /> <br/>
What a strange sight!<pause /> <br/>You could take the other route, but there is a man in tuxedo, looking very nervous.<pause /> <br/>"
			></Dialog></span
		>
		<span slot="next" class="multiNav {enableNext ? '' : 'opacity-0'}">
			<NavButton fn={() => (currentStage = 'wizard')}>🧙🏻‍♂️Wizard</NavButton>
			<NavButton fn={() => (currentStage = 'groom')}>🤵🏾‍♂️Groom</NavButton>
		</span>
	</Stage>
{/if}
{#if currentStage === 'reward'}
	<Stage>
		<span slot="name" class="flex flex-row center"><span class="text-6xl">☀️</span> </span>
		<span slot="info" class={enableNext ? 'showInfoText' : 'opacity-0'}
			>{#if enableNext}
				Choose one item to bring with you{/if}</span
		>
		<span slot="component" class="size-full"
			><b>Narrator: </b><Dialog
				on:complete={() => (enableNext = true)}
				speed={character.talkingSpeed}
				htmlString="As you step out the front door, you find a coin and a flower on the ground!<pause /> <br/>
			"
			></Dialog>
			{#if enableNext}
				<Reward
					rewardOptions={[
						{ name: 'coin', char: '🪙' },
						{ name: 'sunflower', char: '🌻' }
					]}
				/>
			{/if}</span
		>

		<span slot="next" class="multiNav {$rewards.validSelection ? '' : 'opacity-0'}">
			<NavButton
				fn={() => {
					rewards.lock();
					currentStage = 'neighbor';
					enableNext = false;
				}}>Continue</NavButton
			>
		</span>
	</Stage>
{/if}

{#if currentStage === 'neighbor'}
	<Stage>
		<span slot="name" class="flex flex-row center"><span class="text-6xl">☀️</span> </span>
		<span slot="info" class={enableNext ? 'showInfoText' : 'opacity-0'}
			>{#if enableNext}
				What will you do?{/if}</span
		>
		<span slot="component"
			><b>Narrator: </b><Dialog
				on:complete={() => (enableNext = true)}
				speed={character.talkingSpeed}
				htmlString="As you step out the door, you see your neighbor eating the largest ice cream you've ever seen.<pause /> <br/>
				He tries to talk to you."
			></Dialog></span
		>
		<span slot="next" class="multiNav {enableNext ? '' : 'opacity-0'}">
			<NavButton
				fn={() => {
					currentStage = 'ice-cream';
					enableNext = false;
				}}>Talk with him</NavButton
			>
			<NavButton
				fn={() => {
					currentStage = 'journey';
					enableNext = false;
				}}>Ignore him</NavButton
			>
		</span>
	</Stage>
{/if}

{#if currentStage === 'ice-cream'}
	<Stage>
		<span slot="name" class="flex flex-row center"
			><span class="text-6xl">{neighbor.char}</span>
		</span>
		<span slot="info" class={enableNext ? 'showInfoText' : 'opacity-0'}
			>{#if enableNext}
				Will you go to the bakery, or the ice cream shop?{/if}</span
		>
		<span slot="component"
			><b>{neighbor.name}: </b><Dialog
				on:complete={() => (enableNext = true)}
				speed={neighbor.talkingSpeed}
				htmlString="Hey there, friend! You wouldn't believe my luck!<pause /> <br/>
				Becuase of the nice weather, you get extra scoops of ice cream, no extra charge!<pause /><br/> You should check it out while the weather is still nice!!"
			></Dialog></span
		>
		<span slot="next" class="multiNav {enableNext ? '' : 'opacity-0'}">
			<NavButton
				fn={() => {
					currentStage = 'journey';
					enableNext = false;
				}}>Ice cream</NavButton
			>
			<NavButton
				fn={() => {
					//something must happen - store this decision!
					currentStage = 'journey';
					enableNext = false;
				}}>Bagel</NavButton
			>
		</span>
	</Stage>
{/if}
