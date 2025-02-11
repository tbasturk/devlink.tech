<template>
    <div class="card shadow">
        <div class="card-body">
            <LoadingSpinner v-if="loading" class="vh-50" />
            <LoadingError v-else-if="loadingError" class="vh-50" />
            <div v-else-if="developers.length" class="d-flex flex-column align-items-center">
                <div class="w-100">
                    <div v-for="developer in currentPageDevelopers" :key="developer.id" class="row no-gutters mb-2">
                        <div class="col-2 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon v-if="invalidDeveloperAvatars.includes(developer.id)"
                                             icon="user"
                                             style="font-size: 5vw;" />
                            <img v-else
                                 :src="developer.avatar_url"
                                 :alt="developer.name"
                                 @error="invalidDeveloperAvatars.push(developer.id)"
                                 style="max-height: 100%; max-width: 100%; display: block;">
                        </div>

                        <div class="col-10 pl-3">
                            <router-link :to="{ name: 'Developers' }" style="text-decoration: none;">
                                <h5 class="mb-1">{{ developer.name }}</h5>
                            </router-link>

                            <div class="d-flex">
                                <strong class="me-2">Languages:</strong>
                                <div class="d-flex flex-wrap">
                                    <span v-for="language in developer.languages" :key="language" class="me-2">
                                        {{ language }}
                                    </span>
                                </div>
                            </div>

                            <div class="d-flex">
                                <strong class="me-2">Skills:</strong>
                                <div class="d-flex flex-wrap">
                                    <span v-for="skill in developer.skills" :key="skill" class="me-2">
                                        {{ skill }}
                                    </span>
                                </div>
                            </div>

                            <div class="d-flex">
                                <strong class="me-2">Location:</strong>
                                <span>{{ developer.location }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <PaginationButtons :number-of-pages="numberOfPages" :page-number.sync="pageNumber" />
            </div>
            <div v-else class="vh-50 d-flex align-items-center justify-content-center">
                <div class="d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon="search" class="mb-3" style="font-size: 2rem;" />
                    <div>No match found</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import LoadingSpinner from '@/components/Loading/LoadingSpinner';
    import LoadingError from '@/components/Loading/LoadingError';
    import PaginationButtons from '@/components/PaginationButtons';

    export default {
        name: 'DevelopersListCard',
        components: {
            LoadingSpinner,
            LoadingError,
            FontAwesomeIcon,
            PaginationButtons,
        },
        props: {
            loading: { type: Boolean, required: true },
            loadingError: { type: [String, null], default: null },
            developers: { type: Array, required: true },
        },
        data() {
            return {
                pageNumber: 1,
                pageLength: 4,
                invalidDeveloperAvatars: [],
            }
        },
        computed: {
            /**
             * The number of pages of Developers.
             * @returns {number}
             */
            numberOfPages() {
                return Math.ceil(this.developers.length / this.pageLength)
            },
            /**
             * The current page's Developers.
             * @returns {Array<Object>}
             */
            currentPageDevelopers() {
                return this.developers.slice(
                    (this.pageNumber - 1) * this.pageLength, this.pageNumber * this.pageLength
                );
            },
        },
    }
</script>
