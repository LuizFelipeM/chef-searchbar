<template>
    <nav class="navbar is-transparent">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox"
                    width="112" height="28">
            </a>
            <div class="navbar-burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="https://bulma.io/">
                    Home
                </a>
            </div>

            <div class="navbar-item has-dropdown is-hoverable field has-addons is-flex-grow-1 my-auto mx-5">
                <div class="control is-flex-grow-1 has-icons-left">
                    <input class="input" type="text" placeholder="Search" v-model="term" />
                    <span class="icon is-left">
                        <i class="fas fa-search" aria-hidden="true"></i>
                    </span>
                </div>
                <div class="control">
                    <button class="button is-info" v-on:click="onSearchClick">Search</button>
                </div>

                <div class="navbar-dropdown is-boxed mt-1" v-if="term && suggestions.length">
                    <a class="navbar-item suggestion" v-for="{ id, title } in suggestions" :key="id"
                        v-on:click="onSuggestionClick(id)">
                        {{ title }}
                    </a>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped">
                        <p class="control">
                            <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet"
                                data-social-target="https://bulma.io" target="_blank"
                                href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=https://bulma.io&amp;via=jgthms">
                                <span class="icon">
                                    <i class="fab fa-twitter"></i>
                                </span>
                                <span>
                                    Tweet
                                </span>
                            </a>
                        </p>
                        <p class="control">
                            <a class="button is-primary"
                                href="https://github.com/jgthms/bulma/releases/download/0.9.4/bulma-0.9.4.zip">
                                <span class="icon">
                                    <i class="fas fa-download"></i>
                                </span>
                                <span>Download</span>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import _ from "lodash"
import * as singleSpa from "single-spa"
import { routes, api } from "@Chef/utility"

export default {
    data() {
        return {
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
        onSearchClick() {
            singleSpa.navigateToUrl(routes.SEARCH.replace(":term", this.term))
        }
    }
}
</script>