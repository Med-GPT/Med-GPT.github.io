import { echo } from './utils'

Object.assign(globalThis, {
    DOM: Object.assign(document, {
        on: document.addEventListener,
        $_: document.querySelectorAll,
        $: document.querySelector,
    }),
})

const $li = DOM.$_('a[data-ext]')
const artifactReg = /(.*?)\.(exe|dmg|nz|gpg)/
const api = 'https://api.github.com/repos/Med-GPT/Med-GPT/releases/latest'
const downloadUrl = 'https://github.com/Med-GPT/Med-GPT/releases/download/'

try {

    const res = await fetch(api)
    const latest: Latest = await res.json()
    const version = latest.tag_name

    const _artifatcs = latest.assets
        .flatMap(
            artifact => artifactReg.test(artifact.name)
                ? [[artifact.name.split('.').pop(), {
                    url: artifact.browser_download_url,
                    name: artifact.name,
                }]]
                : []
        ) as [ext: string, obj: { url: string, name: string }][]
    _artifatcs.push(
        ['zip', {
            url: latest.zipball_url,
            name: 'Source.zip'
        }], ['tar', {
            url: latest.tarball_url,
            name: 'Source.tar'
        }]
    )

    const artifacts = Object.fromEntries(_artifatcs)

    echo(artifacts)

    //@ts-ignore
    $li.forEach((el: HTMLElement, k, pr) => {

        const ext = el.dataset.ext!

        if (ext in artifacts) {

            el.setAttribute('href', artifacts[ext].url)
            el.innerText = artifacts[ext].name

        }

    })


} catch (err) {
    echo.err('fetch failed', err)
}

