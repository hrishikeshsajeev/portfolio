import axios from 'axios'

const GITHUB_USERNAME = 'hrishikeshsajeev' // Assuming from user path, or I should ask? I'll use a placeholder or try to infer. 
// Wait, the user said "Pull my github project". I don't know the username. 
// I should probably ask, or just use a placeholder variable. 
// However, looking at the user path `/Users/hrishikeshsajeev/`, the username is likely `hrishikeshsajeev`.
// I will use that for now.

const api = axios.create({
    baseURL: 'https://api.github.com/users/hrishikeshsajeev'
})

import projectsData from '../data/projects.json'

export const fetchRepos = async () => {
    // Return local curated data
    return projectsData
}

export const fetchRepoImage = async (repoName, defaultBranch) => {
    try {
        const branch = defaultBranch || 'main'
        const readmeUrl = `https://raw.githubusercontent.com/hrishikeshsajeev/${repoName}/${branch}/README.md`
        const { data } = await axios.get(readmeUrl)

        // 1. Look for Markdown literal images: ![alt](url)
        const mdMatch = data.match(/!\[.*?\]\((.*?)\)/)

        // 2. Look for HTML img tags: <img ... src="url" ... >
        const htmlMatch = data.match(/<img[^>]+src=["'](.*?)["']/)

        let imageUrl = null
        if (mdMatch) imageUrl = mdMatch[1]
        else if (htmlMatch) imageUrl = htmlMatch[1]

        if (imageUrl) {
            // If relative path (not starting with http), prepend raw content URL path
            if (!imageUrl.startsWith('http')) {
                // Remove ./ at start if present
                const cleanPath = imageUrl.replace(/^\.\//, '')
                return `https://raw.githubusercontent.com/hrishikeshsajeev/${repoName}/${branch}/${cleanPath}`
            }
            return imageUrl
        }

        return null
    } catch (error) {
        return null
    }
}


