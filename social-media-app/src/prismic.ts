import * as prismic from "@prismicio/client"

const repositoryName = process.env.REACT_APP_PRISMIC_REPO_NAME as string

export const client = prismic.createClient(repositoryName)
