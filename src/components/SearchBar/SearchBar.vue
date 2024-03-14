<template>
    <nav class="navbar is-transparent p-2">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <i class="fa-solid fa-bowl-food fa-2xl"></i>
                <b class="is-size-4 ml-2">Chef</b>
            </a>
            <div class="navbar-burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" href="/">
                    Home
                </a>
            </div>

            <div class="navbar-item has-dropdown is-hoverable field has-addons is-flex-grow-1 my-auto mx-5">
                <div class="control is-flex-grow-1 has-icons-left">
                    <input class="input" type="text" placeholder="Search" v-model="term" @keypress.enter="search" />
                    <span class="icon is-left">
                        <i class="fas fa-search" aria-hidden="true"></i>
                    </span>
                </div>
                <div class="control">
                    <button class="button is-info" v-on:click="search">Search</button>
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
                            <a class="bd-tw-button button" data-social-network="Github"
                                data-social-target="https://github.com/LuizFelipeM/" target="_blank"
                                href="https://github.com/LuizFelipeM/">
                                <span class="icon">
                                    <i class="fa-brands fa-github"></i>
                                </span>
                                <span>
                                    Github
                                </span>
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
        search() {
            singleSpa.navigateToUrl(routes.SEARCH.replace(":term", this.term))
        }
    }
}
</script>