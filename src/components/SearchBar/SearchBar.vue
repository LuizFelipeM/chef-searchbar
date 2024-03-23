<style>
.polaroid.first.left {
    transform: rotate(-8deg);
}

.polaroid.second.left {
    left: 18.4%;
    top: 12%;
}

.polaroid.first.right {
    left: 70%;
    transform: rotate(8deg);
}

.polaroid.second.right {
    transform: rotate(-20deg);
    top: 9%;
    left: 75%;
}
</style>

<template>
    <section class="hero is-medium is-link">
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item has-text-white" v-on:click="goHome">
                            <i class="fa-solid fa-bowl-food fa-2xl"></i>
                            <b class="is-size-4 ml-2">Chef</b>
                        </a>
                        <span class="navbar-burger" data-target="navbarMenuHeroB">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>

                    <div id="navbarMenuHeroB" class="navbar-menu">
                        <div class="navbar-end">
                            <div
                                class="navbar-item has-dropdown is-hoverable field has-addons is-flex-grow-1 my-auto ml-3">
                                <div class="control is-flex-grow-1">
                                    <input class="input" type="text" placeholder="Search recipe, ingredient or keyword"
                                        v-model="term" @keypress.enter="onSearch" />
                                </div>
                                <div class="control">
                                    <button class="button" v-on:click="onSearch">
                                        <span class="icon">
                                            <i class="fas fa-search" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>

                                <div class="navbar-dropdown is-boxed mt-1 has-text-grey-dark"
                                    v-if="term && suggestions.length">
                                    <a class="navbar-item suggestion" v-for="{ id, title } in  suggestions " :key="id"
                                        v-on:click="onSuggestion(id)">
                                        {{ title }}
                                    </a>
                                </div>
                            </div>

                            <span class="navbar-item">
                                <a class="button is-link is-inverted"
                                    data-social-target="https://github.com/LuizFelipeM/" target="_blank"
                                    href="https://github.com/LuizFelipeM/">
                                    <span class="icon">
                                        <i class="fab fa-github"></i>
                                    </span>
                                    <span>Github</span>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

        <div class="hero-body is-relative" v-if="pathname === routes.HOME">
            <div class="polaroid-group is-hidden-mobile">
                <PolaroidCard class="second left" imgSrc="https://spoonacular.com/recipeImages/632749-556x370.jpg"
                    caption="Arroz Con Pollo" />
                <PolaroidCard class="first left" imgSrc="https://spoonacular.com/recipeImages/716417-556x370.jpg"
                    caption="Strawberry Shortcake w. Mini Strawberry PopTarts" />
            </div>

            <div class="container has-text-centered">
                <p class="title has-text-white">
                    Chef's Corner
                </p>
                <p class="subtitle has-text-white">
                    A Culinary Hub for Inspired Recipes and Gastronomic Adventures
                    <br />
                    <span class="is-size-7">
                        Powered by
                        <a href="https://spoonacular.com/food-api" target="_blank" class="is-underlined has-text-white">
                            Spoonacular API
                        </a>
                        and
                        <a href="https://newsapi.org/" target="_blank" class="is-underlined has-text-white">
                            News API
                        </a>
                    </span>
                </p>
            </div>

            <div class="polaroid-group is-hidden-mobile">
                <PolaroidCard class="first right" imgSrc="https://spoonacular.com/recipeImages/636602-556x370.jpg"
                    caption="Butternut Squash Soup (In Half An Hour!)" />
                <PolaroidCard class="second right" imgSrc="https://spoonacular.com/recipeImages/640730-556x370.jpg"
                    caption="Creme Brulee" />
            </div>
        </div>
    </section>
</template>

<script>
import _ from "lodash"
import * as singleSpa from "single-spa"
import { routes, api } from "@Chef/utility"
import PolaroidCard from '../PolaroidCard/PolaroidCard.vue'

export default {
    name: 'SearchBar',
    components: {
        PolaroidCard
    },

    mounted() { window.addEventListener('single-spa:before-routing-event', this.beforeRoutingEvent) },
    unmounted() { window.removeEventListener('single-spa:before-routing-event', this.beforeRoutingEvent) },

    data() {
        return {
            pathname: window.location.pathname,
            routes,
            term: "",
            suggestions: []
        }
    },

    created() {
        this.autocomplete = _.debounce(async (term) => {
            try {
                const suggestions = await api.recipes.autocomplete(term, 5)
                this.suggestions = suggestions
            } catch (error) {
                console.error(error)
            }
        }, 500)
    },

    watch: {
        term(...args) { this.autocomplete(...args) }
    },

    methods: {
        goHome() { singleSpa.navigateToUrl(routes.HOME) },
        beforeRoutingEvent({ detail: { newUrl } }) {
            const url = new URL(newUrl)
            this.pathname = url.pathname
        },
        onSuggestion(id) { singleSpa.navigateToUrl(routes.RECIPE.replace(":id", id)) },
        onSearch() { singleSpa.navigateToUrl(routes.SEARCH.replace(":term", this.term)) },
    }
}
</script>