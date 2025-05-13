

declare global {

    const DOM: Document & {
        on: Document['addEventListener']
        $_: Document['querySelectorAll']
        $: Document['querySelector']
    }

    type Latest = {
        anme: string
        tag_name: string
        zipball_url: string
        tarball_url: string
        assets: {
            name: string
            browser_download_url: string
        }[]
    }

}

export { }