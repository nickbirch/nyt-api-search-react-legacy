export interface Article {
    abstract: string,
    byline: string[],       
    document_type: string,
    headline: Headline,
    keywords: Keywords[],
    lead_paragraph: string,
    multimedia: Multimedia[],
    news_desk: string,
    print_page: string,
    print_section: string,
    pub_date: string,
    section_name: string,
    snippet: string,
    source: string,
    type_of_material: string,
    uri: string,
    web_url: string,
    word_count: number,
    _id: string
}

export interface Keywords {
    major: string,
    name: string,
    rank: number,
    value: string
}

interface Multimedia {
    caption: string,
    credit: string,
    crop_name: string,
    height: number,
    legacy: string[],
    rank: number,
    subType: string,
    subtype: string,
    type: string,
    url: string,
    width: number
}

interface Headline {
    content_kicker: string,
    kicker: string,
    main: string,
    name: string,
    print_headline: string,
    seo: string,
    sub: string
}


