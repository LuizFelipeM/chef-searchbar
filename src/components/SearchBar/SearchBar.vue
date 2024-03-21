<script>
import _ from "lodash"
import * as singleSpa from "single-spa"
import { routes, api } from "@Chef/utility"

export default {
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
        term(...args) {
            this.autocomplete(...args)
        }
    },

    methods: {
        onSuggestionClick(id) {
            singleSpa.navigateToUrl(routes.RECIPE.replace(":id", id))
        },
        search() {
            singleSpa.navigateToUrl(routes.SEARCH.replace(":term", this.term))
        }
    }
}
</script>

<style>
.is-borderless {
    border: 0 !important;
}

.polaroid {
    top: 18%;
    left: 15%;
    position: absolute;

    background-color: #fff;
    padding: 13px;
    width: 200px;
    max-width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}


.polaroid.first.left {
    transform: rotate(8deg);
    top: 9%;
    left: 22%;
}

.polaroid.second.left {
    left: 18.4%;
    top: 12%;
}

.polaroid.third.left {
    transform: rotate(-8deg);
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

.photo-container {
    width: 100%;
    height: 200px;
    /* Adjust as needed */
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.photo {
    width: auto;
    height: 100%;
    object-fit: cover;
}

.caption {
    text-align: center;
    font-size: 0.8rem;
    margin-top: 5px;
    font-family: Arial, sans-serif;
    color: #555;
}
</style>

<template>
    <section class="hero is-medium is-info">
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item">
                            <a class="navbar-item" href="/">
                                <i class="fa-solid fa-bowl-food fa-2xl"></i>
                                <b class="is-size-4 ml-2">Chef</b>
                            </a>
                        </a>
                        <span class="navbar-burger" data-target="navbarMenuHeroB">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>

                    <div id="navbarMenuHeroB" class="navbar-menu">
                        <div class="navbar-end">
                            <a v-bind:class="(pathname === routes.HOME) ? 'is-active' : null" class="navbar-item"
                                href="/">
                                Home
                            </a>

                            <div
                                class="navbar-item has-dropdown is-hoverable field has-addons is-flex-grow-1 my-auto ml-3">
                                <div class="control is-flex-grow-1 is-borderless">
                                    <input class="input" type="text" placeholder="Search recipe, ingredient or keyword"
                                        v-model="term" @keypress.enter="search" />
                                </div>
                                <div class="control">
                                    <button class="button is-white has-text-info is-borderless" v-on:click="search">
                                        <span class="icon">
                                            <i class="fas fa-search" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>

                                <div class="navbar-dropdown is-boxed mt-1 has-text-grey-dark"
                                    v-if="term && suggestions.length">
                                    <a class="navbar-item suggestion" v-for="{ id, title } in  suggestions " :key="id"
                                        v-on:click="onSuggestionClick(id)">
                                        {{ title }}
                                    </a>
                                </div>
                            </div>

                            <span class="navbar-item">
                                <a class="button is-info is-inverted"
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
                <div class="polaroid second left">
                    <div class="photo-container">
                        <img src="https://spoonacular.com/recipeImages/632749-556x370.jpg" alt="Arroz Con Pollo"
                            class="photo">
                    </div>
                    <p class="caption">Arroz Con Pollo</p>
                </div>
                <div class="polaroid third left">
                    <div class="photo-container">
                        <img src="https://spoonacular.com/recipeImages/716417-556x370.jpg"
                            alt="Strawberry Shortcake w. Mini Strawberry PopTarts<" class="photo">
                    </div>
                    <p class="caption">Strawberry Shortcake w. Mini Strawberry PopTarts</p>
                </div>
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
                        <a href="https://spoonacular.com/food-api" target="_blank" class="is-underlined">
                            Spoonacular API
                        </a>
                    </span>
                </p>
            </div>

            <div class="polaroid-group is-hidden-mobile">
                <div class="polaroid first right">
                    <div class="photo-container">
                        <img src="https://spoonacular.com/recipeImages/636602-556x370.jpg"
                            alt="Butternut Squash Soup (In Half An Hour!)" class="photo">
                    </div>
                    <p class="caption">Butternut Squash Soup (In Half An Hour!)</p>
                </div>
                <div class="polaroid second right">
                    <div class="photo-container">
                        <img src="https://spoonacular.com/recipeImages/640730-556x370.jpg" alt="Creme Brulee"
                            class="photo">
                    </div>
                    <p class="caption">Creme Brulee</p>
                </div>
            </div>
        </div>
    </section>
</template>