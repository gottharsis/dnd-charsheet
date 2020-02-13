<template>
	<div class="features">
		<h3 class="is-size-3 has-text-weight-bold">
			Features
		</h3>
		<div v-for="feature in features" :key="feature.name">
			<p class="has-text-weight-bold">
				{{ feature.name }}
			</p>

			<p>
				{{ feature.description }}
			</p>
		</div>
	</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("Character");
export default {
	name: "Features",

	data() {
		return {};
	},
	computed: {
		...mapState({
			features: state => state.character.features
		})
	}
};
</script>

<style lang="scss" scoped></style>
