import { ScanItem, BookVolume } from '@/src/types';

const books: BookVolume[] = [
    {
        kind: 'books#volume',
        id: 'lzSa6LVV4tcC',
        etag: '07l67s38d0g',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/lzSa6LVV4tcC',
        volumeInfo: {
            title: 'Network Programming with Perl',
            authors: ['Lincoln D. Stein'],
            publisher: 'Addison-Wesley Professional',
            publishedDate: '2001',
            description:
                'A text focusing on the methods and alternatives for designed TCP/IP-based client/server systems and advanced techniques for specialized applications with Perl. A guide examining a collection of the best third party modules in the Comprehensive Perl Archive Network. Topics covered: Perl function libraries and techniques that allow programs to interact with resources over a network. IO: Socket library ; Net: FTP library -- Telnet library -- SMTP library ; Chat problems ; Internet Message Access Protocol (IMAP) issues ; Markup-language parsing ; Internet Protocol (IP) broadcasting and multicasting.',
            industryIdentifiers: [
                {
                    type: 'ISBN_10',
                    identifier: '0201615711'
                },
                {
                    type: 'ISBN_13',
                    identifier: '9780201615715'
                }
            ],
            readingModes: {
                text: false,
                image: true
            },
            pageCount: 798,
            printType: 'BOOK',
            categories: ['Computers'],
            maturityRating: 'NOT_MATURE',
            allowAnonLogging: false,
            contentVersion: '1.5.4.0.preview.1',
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false
            },
            imageLinks: {
                smallThumbnail:
                    'http://books.google.com/books/content?id=lzSa6LVV4tcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail:
                    'http://books.google.com/books/content?id=lzSa6LVV4tcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'en',
            previewLink:
                'http://books.google.com/books?id=lzSa6LVV4tcC&pg=PA270&dq=search_terms&hl=&cd=1&source=gbs_api',
            infoLink:
                'http://books.google.com/books?id=lzSa6LVV4tcC&dq=search_terms&hl=&source=gbs_api',
            canonicalVolumeLink:
                'https://books.google.com/books/about/Network_Programming_with_Perl.html?hl=&id=lzSa6LVV4tcC'
        },
        saleInfo: {
            country: 'US',
            saleability: 'NOT_FOR_SALE',
            isEbook: false
        },
        accessInfo: {
            country: 'US',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED_FOR_ACCESSIBILITY',
            epub: {
                isAvailable: false
            },
            pdf: {
                isAvailable: false
            },
            webReaderLink:
                'http://play.google.com/books/reader?id=lzSa6LVV4tcC&hl=&source=gbs_api',
            accessViewStatus: 'SAMPLE',
            quoteSharingAllowed: false
        },
        searchInfo: {
            textSnippet:
                '... \u003cb\u003esearch_terms\u003c/b\u003e = &quot; @ARGV &quot; ; 12 my $ request = POST ( RFC_SEARCH , 13 Content = &gt; [ query 14 = &gt; $ \u003cb\u003esearch_terms\u003c/b\u003e , archive = &gt; &#39; rfcindex &#39; 15 ] , 16 Referer = &gt; RFC_REFERER 17 ) ; $ ua- &gt; request ( $ request ) ; die $ response- &gt; message&nbsp;...'
        }
    },
    {
        kind: 'books#volume',
        id: 'CH4kaMXYt4QC',
        etag: 'qsLr5OrjCxo',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/CH4kaMXYt4QC',
        volumeInfo: {
            title: 'Oracle XSQL',
            subtitle:
                'Combining SQL, Oracle Text, XSLT, and Java to Publish Dynamic Web Content',
            authors: ['Michael D. Thomas'],
            publisher: 'John Wiley & Sons',
            publishedDate: '2003-02-17',
            description:
                'Presents a complete approach to building XML Web applications and Web services with XSQL, Oracle Text, SQL, XSLT, and Java from data found in Oracle databases Offers expert tips on how to enhance XSQL with servlets and Java Server Pages (JSP) Provides a detailed comparison of XSQL and XQuery Companion Web site contains the code examples in the book as well as useful links where readers can download the Oracle XDK',
            industryIdentifiers: [
                {
                    type: 'ISBN_13',
                    identifier: '9780471457350'
                },
                {
                    type: 'ISBN_10',
                    identifier: '0471457353'
                }
            ],
            readingModes: {
                text: false,
                image: true
            },
            pageCount: 594,
            printType: 'BOOK',
            categories: ['Computers'],
            maturityRating: 'NOT_MATURE',
            allowAnonLogging: false,
            contentVersion: '0.1.0.0.preview.1',
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false
            },
            imageLinks: {
                smallThumbnail:
                    'http://books.google.com/books/content?id=CH4kaMXYt4QC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail:
                    'http://books.google.com/books/content?id=CH4kaMXYt4QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'en',
            previewLink:
                'http://books.google.com/books?id=CH4kaMXYt4QC&pg=PA417&dq=search_terms&hl=&cd=2&source=gbs_api',
            infoLink:
                'http://books.google.com/books?id=CH4kaMXYt4QC&dq=search_terms&hl=&source=gbs_api',
            canonicalVolumeLink:
                'https://books.google.com/books/about/Oracle_XSQL.html?hl=&id=CH4kaMXYt4QC'
        },
        saleInfo: {
            country: 'US',
            saleability: 'NOT_FOR_SALE',
            isEbook: false
        },
        accessInfo: {
            country: 'US',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED',
            epub: {
                isAvailable: false
            },
            pdf: {
                isAvailable: true,
                acsTokenLink:
                    'http://books.google.com/books/download/Oracle_XSQL-sample-pdf.acsm?id=CH4kaMXYt4QC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
            },
            webReaderLink:
                'http://play.google.com/books/reader?id=CH4kaMXYt4QC&hl=&source=gbs_api',
            accessViewStatus: 'SAMPLE',
            quoteSharingAllowed: false
        },
        searchInfo: {
            textSnippet:
                '... \u003cb\u003esearch terms\u003c/b\u003e need to appear at the top of the \u003cb\u003esearch\u003c/b\u003e results page . A quick review of the \u003cb\u003esearch\u003c/b\u003e functionality may be needed . The prod -\u003cb\u003esearch\u003c/b\u003e.xsql page performs the \u003cb\u003esearch\u003c/b\u003e based on the \u003cb\u003esearch_terms\u003c/b\u003e parameter passed to it from the \u003cb\u003esearch\u003c/b\u003e&nbsp;...'
        }
    },
    {
        kind: 'books#volume',
        id: 'S6o-L_lCH7QC',
        etag: 'O6tshMECOLg',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/S6o-L_lCH7QC',
        volumeInfo: {
            title: 'TYPO3-Extensions entwickeln',
            subtitle:
                'Der Entwicklerleitfaden für Extensions mit der TYPO3-API',
            authors: ['Dmitry Dulepov'],
            publisher: 'Pearson Deutschland GmbH',
            publishedDate: '2009',
            industryIdentifiers: [
                {
                    type: 'ISBN_10',
                    identifier: '3827330351'
                },
                {
                    type: 'ISBN_13',
                    identifier: '9783827330352'
                }
            ],
            readingModes: {
                text: false,
                image: true
            },
            pageCount: 246,
            printType: 'BOOK',
            maturityRating: 'NOT_MATURE',
            allowAnonLogging: false,
            contentVersion: '2.3.5.0.preview.1',
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false
            },
            imageLinks: {
                smallThumbnail:
                    'http://books.google.com/books/content?id=S6o-L_lCH7QC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail:
                    'http://books.google.com/books/content?id=S6o-L_lCH7QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'de',
            previewLink:
                'http://books.google.com/books?id=S6o-L_lCH7QC&pg=PA169&dq=search_terms&hl=&cd=3&source=gbs_api',
            infoLink:
                'http://books.google.com/books?id=S6o-L_lCH7QC&dq=search_terms&hl=&source=gbs_api',
            canonicalVolumeLink:
                'https://books.google.com/books/about/TYPO3_Extensions_entwickeln.html?hl=&id=S6o-L_lCH7QC'
        },
        saleInfo: {
            country: 'US',
            saleability: 'NOT_FOR_SALE',
            isEbook: false
        },
        accessInfo: {
            country: 'US',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED',
            epub: {
                isAvailable: false
            },
            pdf: {
                isAvailable: true,
                acsTokenLink:
                    'http://books.google.com/books/download/TYPO3_Extensions_entwickeln-sample-pdf.acsm?id=S6o-L_lCH7QC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
            },
            webReaderLink:
                'http://play.google.com/books/reader?id=S6o-L_lCH7QC&hl=&source=gbs_api',
            accessViewStatus: 'SAMPLE',
            quoteSharingAllowed: false
        },
        searchInfo: {
            textSnippet:
                '... \u003cb\u003eSEARCH_TERMS\u003c/b\u003e ### &#39; = &gt; htmlspecialchars ( $ this- &gt; pi Vars [ &#39; \u003cb\u003esearch\u003c/b\u003e &#39; ] ) , ### PID ### &#39; = &gt; intval ( $ this- &gt; conf [ &#39; usersPid &#39; ] ) , CSS - Änderungen werden direkt aus der Anleitung zu Scriptaculous kopiert , sodass wir sie&nbsp;...'
        }
    },
    {
        kind: 'books#volume',
        id: '6zpsDwAAQBAJ',
        etag: 'ECXTtSLDE1U',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/6zpsDwAAQBAJ',
        volumeInfo: {
            title: 'Business Process Management',
            subtitle:
                '16th International Conference, BPM 2018, Sydney, NSW, Australia, September 9–14, 2018, Proceedings',
            authors: [
                'Mathias Weske',
                'Marco Montali',
                'Ingo Weber',
                'Jan vom Brocke'
            ],
            publisher: 'Springer',
            publishedDate: '2018-08-31',
            description:
                'This book constitutes the proceedings of the 16th International Conference on Business Process Management, BPM 2018, held in Sydney, Australia, in September 2018. The 27 papers presented in this volume were carefully reviewed and selected from 140 submissions. They were organized in topical sections named: reflections on BPM; concepts and methods in business process modeling and analysis; foundations of process discovery; alignments and conformance checking; process model analysis and machine learning; digital process innovation; and method analysis and selection.',
            industryIdentifiers: [
                {
                    type: 'ISBN_13',
                    identifier: '9783319986487'
                },
                {
                    type: 'ISBN_10',
                    identifier: '3319986481'
                }
            ],
            readingModes: {
                text: true,
                image: true
            },
            pageCount: 526,
            printType: 'BOOK',
            categories: ['Computers'],
            maturityRating: 'NOT_MATURE',
            allowAnonLogging: false,
            contentVersion: '2.5.6.0.preview.3',
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false
            },
            imageLinks: {
                smallThumbnail:
                    'http://books.google.com/books/content?id=6zpsDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail:
                    'http://books.google.com/books/content?id=6zpsDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'en',
            previewLink:
                'http://books.google.com/books?id=6zpsDwAAQBAJ&pg=PA451&dq=search_terms&hl=&cd=4&source=gbs_api',
            infoLink:
                'https://play.google.com/store/books/details?id=6zpsDwAAQBAJ&source=gbs_api',
            canonicalVolumeLink:
                'https://play.google.com/store/books/details?id=6zpsDwAAQBAJ'
        },
        saleInfo: {
            country: 'US',
            saleability: 'FOR_SALE_AND_RENTAL',
            isEbook: true,
            listPrice: {
                amount: 54.99,
                currencyCode: 'USD'
            },
            retailPrice: {
                amount: 43.44,
                currencyCode: 'USD'
            },
            buyLink:
                'https://play.google.com/store/books/details?id=6zpsDwAAQBAJ&rdid=book-6zpsDwAAQBAJ&rdot=1&source=gbs_api',
            offers: [
                {
                    finskyOfferType: 1,
                    listPrice: {
                        amountInMicros: 54990000,
                        currencyCode: 'USD'
                    },
                    retailPrice: {
                        amountInMicros: 43440000,
                        currencyCode: 'USD'
                    },
                    giftable: true
                },
                {
                    finskyOfferType: 3,
                    listPrice: {
                        amountInMicros: 19250000,
                        currencyCode: 'USD'
                    },
                    retailPrice: {
                        amountInMicros: 16750000,
                        currencyCode: 'USD'
                    },
                    rentalDuration: {
                        unit: 'DAY',
                        count: 90
                    }
                }
            ]
        },
        accessInfo: {
            country: 'US',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED',
            epub: {
                isAvailable: true,
                acsTokenLink:
                    'http://books.google.com/books/download/Business_Process_Management-sample-epub.acsm?id=6zpsDwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
            },
            pdf: {
                isAvailable: true,
                acsTokenLink:
                    'http://books.google.com/books/download/Business_Process_Management-sample-pdf.acsm?id=6zpsDwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
            },
            webReaderLink:
                'http://play.google.com/books/reader?id=6zpsDwAAQBAJ&hl=&source=gbs_api',
            accessViewStatus: 'SAMPLE',
            quoteSharingAllowed: false
        },
        searchInfo: {
            textSnippet:
                '... \u003cb\u003eSearch_Terms\u003c/b\u003e . It consists of the elements synonyms , generalisations , specialisations , and equivalence rules . Synonyms are literals in different languages which are referring to the possible \u003cb\u003esearch terms\u003c/b\u003e in the logs for the concept&nbsp;...'
        }
    },
    {
        kind: 'books#volume',
        id: 'kO-qCAAAQBAJ',
        etag: 'JA5foTpKjXI',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/kO-qCAAAQBAJ',
        volumeInfo: {
            title: 'Practical Aspects of Declarative Languages',
            subtitle:
                'Third International Symposium, PADL 2001 Las Vegas, Nevada, March 11-12, 2001 Proceedings',
            authors: ['I.V. Ramakrishnan'],
            publisher: 'Springer',
            publishedDate: '2003-06-29',
            description:
                'This book constitutes the refereed proceedings of the Third International Symposium on Practical Aspects of Declarative Programming, PADL 2001, held in Las Vegas, Nevada, USA in March 2001. The 23 revised full papers presented were carefully reviewed and selected from a total of 40 submissions. Among the topics covered are Mu-calculus, specification languages, Java, Internet programming, VRML, security protocols, database security, authentication protocols, Prolog programming, implementation, constraint programming, visual tracking, and model checking.',
            industryIdentifiers: [
                {
                    type: 'ISBN_13',
                    identifier: '9783540452416'
                },
                {
                    type: 'ISBN_10',
                    identifier: '3540452419'
                }
            ],
            readingModes: {
                text: false,
                image: true
            },
            pageCount: 352,
            printType: 'BOOK',
            categories: ['Computers'],
            maturityRating: 'NOT_MATURE',
            allowAnonLogging: false,
            contentVersion: 'preview-1.0.0',
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false
            },
            imageLinks: {
                smallThumbnail:
                    'http://books.google.com/books/content?id=kO-qCAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail:
                    'http://books.google.com/books/content?id=kO-qCAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'en',
            previewLink:
                'http://books.google.com/books?id=kO-qCAAAQBAJ&pg=PA56&dq=search_terms&hl=&cd=5&source=gbs_api',
            infoLink:
                'https://play.google.com/store/books/details?id=kO-qCAAAQBAJ&source=gbs_api',
            canonicalVolumeLink:
                'https://play.google.com/store/books/details?id=kO-qCAAAQBAJ'
        },
        saleInfo: {
            country: 'US',
            saleability: 'FOR_SALE_AND_RENTAL',
            isEbook: true,
            listPrice: {
                amount: 54.99,
                currencyCode: 'USD'
            },
            retailPrice: {
                amount: 43.44,
                currencyCode: 'USD'
            },
            buyLink:
                'https://play.google.com/store/books/details?id=kO-qCAAAQBAJ&rdid=book-kO-qCAAAQBAJ&rdot=1&source=gbs_api',
            offers: [
                {
                    finskyOfferType: 1,
                    listPrice: {
                        amountInMicros: 54990000,
                        currencyCode: 'USD'
                    },
                    retailPrice: {
                        amountInMicros: 43440000,
                        currencyCode: 'USD'
                    },
                    giftable: true
                },
                {
                    finskyOfferType: 3,
                    listPrice: {
                        amountInMicros: 19250000,
                        currencyCode: 'USD'
                    },
                    retailPrice: {
                        amountInMicros: 16750000,
                        currencyCode: 'USD'
                    },
                    rentalDuration: {
                        unit: 'DAY',
                        count: 90
                    }
                }
            ]
        },
        accessInfo: {
            country: 'US',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED',
            epub: {
                isAvailable: false
            },
            pdf: {
                isAvailable: true,
                acsTokenLink:
                    'http://books.google.com/books/download/Practical_Aspects_of_Declarative_Languag-sample-pdf.acsm?id=kO-qCAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
            },
            webReaderLink:
                'http://play.google.com/books/reader?id=kO-qCAAAQBAJ&hl=&source=gbs_api',
            accessViewStatus: 'SAMPLE',
            quoteSharingAllowed: false
        },
        searchInfo: {
            textSnippet:
                '... \u003cb\u003esearch\u003c/b\u003e is performed by suitably invoking the underlying CGI script in the remote reference directory. The needed query ... \u003cb\u003esearch_terms\u003c/b\u003e(Quality,ClassType,Terms,Keys), result_number(Quality,N), build_query(ClassType,RefDir,Keys,N,Url)&nbsp;...'
        }
    },
    {
        kind: 'books#volume',
        id: 'erlok6kgqfcC',
        etag: '64fdllVN+kM',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/erlok6kgqfcC',
        volumeInfo: {
            title: 'TYPO3 Extension Development',
            authors: ['Dmitry Dulepov'],
            publisher: 'Packt Publishing Ltd',
            publishedDate: '2008-09-30',
            description:
                "Developer's guide to creating feature rich extensions using the TYPO3 API",
            industryIdentifiers: [
                {
                    type: 'ISBN_13',
                    identifier: '9781847192134'
                },
                {
                    type: 'ISBN_10',
                    identifier: '1847192130'
                }
            ],
            readingModes: {
                text: true,
                image: true
            },
            pageCount: 318,
            printType: 'BOOK',
            categories: ['Computers'],
            maturityRating: 'NOT_MATURE',
            allowAnonLogging: false,
            contentVersion: '1.3.3.0.preview.3',
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false
            },
            imageLinks: {
                smallThumbnail:
                    'http://books.google.com/books/content?id=erlok6kgqfcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail:
                    'http://books.google.com/books/content?id=erlok6kgqfcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'en',
            previewLink:
                'http://books.google.com/books?id=erlok6kgqfcC&pg=PT220&dq=search_terms&hl=&cd=6&source=gbs_api',
            infoLink:
                'https://play.google.com/store/books/details?id=erlok6kgqfcC&source=gbs_api',
            canonicalVolumeLink:
                'https://play.google.com/store/books/details?id=erlok6kgqfcC'
        },
        saleInfo: {
            country: 'US',
            saleability: 'FOR_SALE',
            isEbook: true,
            listPrice: {
                amount: 28.99,
                currencyCode: 'USD'
            },
            retailPrice: {
                amount: 17.84,
                currencyCode: 'USD'
            },
            buyLink:
                'https://play.google.com/store/books/details?id=erlok6kgqfcC&rdid=book-erlok6kgqfcC&rdot=1&source=gbs_api',
            offers: [
                {
                    finskyOfferType: 1,
                    listPrice: {
                        amountInMicros: 28990000,
                        currencyCode: 'USD'
                    },
                    retailPrice: {
                        amountInMicros: 17840000,
                        currencyCode: 'USD'
                    },
                    giftable: true
                }
            ]
        },
        accessInfo: {
            country: 'US',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED',
            epub: {
                isAvailable: true
            },
            pdf: {
                isAvailable: true
            },
            webReaderLink:
                'http://play.google.com/books/reader?id=erlok6kgqfcC&hl=&source=gbs_api',
            accessViewStatus: 'SAMPLE',
            quoteSharingAllowed: false
        },
        searchInfo: {
            textSnippet:
                '... Next , there is a label marker ( ### TEXT \u003cb\u003eSEARCH\u003c/b\u003e ### ) , a \u003cb\u003esearch terms\u003c/b\u003e marker ( ### \u003cb\u003eSEARCH_TERMS\u003c/b\u003e ### ) , ( ### TEST SUBMITBTN ### ) . and a marker for button text Adding a \u003cb\u003eSearch\u003c/b\u003e Condition The \u003cb\u003esearch\u003c/b\u003e condition is added to.'
        }
    },
    {
        kind: 'books#volume',
        id: 'wqfcAwAAQBAJ',
        etag: '31xBn7NZv8M',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/wqfcAwAAQBAJ',
        volumeInfo: {
            title: 'Discovering and Using Historical Geographic Resources on the Web',
            subtitle: 'A Practical Guide for Librarians',
            authors: ['Eva H. Dodsworth', 'L. W. Laliberté'],
            publisher: 'Rowman & Littlefield',
            publishedDate: '2014-06-12',
            description:
                'Historical geographic resources have traditionally been only accessible in print, and in person. But due to the popularity of online mapping and increased digitization, historical maps and other geographic resources are resurfacing, providing users with rich information publically accessible online. Discovering and Using Historical Geographic Resources on the Web provides library and archival staff, and their users, with information on how to locate, interpret, understand, and use these resources.',
            industryIdentifiers: [
                {
                    type: 'ISBN_13',
                    identifier: '9780810891456'
                },
                {
                    type: 'ISBN_10',
                    identifier: '081089145X'
                }
            ],
            readingModes: {
                text: true,
                image: true
            },
            pageCount: 138,
            printType: 'BOOK',
            categories: ['Language Arts & Disciplines'],
            maturityRating: 'NOT_MATURE',
            allowAnonLogging: false,
            contentVersion: '0.2.3.0.preview.3',
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false
            },
            imageLinks: {
                smallThumbnail:
                    'http://books.google.com/books/content?id=wqfcAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail:
                    'http://books.google.com/books/content?id=wqfcAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'en',
            previewLink:
                'http://books.google.com/books?id=wqfcAwAAQBAJ&pg=PA50&dq=search_terms&hl=&cd=7&source=gbs_api',
            infoLink:
                'https://play.google.com/store/books/details?id=wqfcAwAAQBAJ&source=gbs_api',
            canonicalVolumeLink:
                'https://play.google.com/store/books/details?id=wqfcAwAAQBAJ'
        },
        saleInfo: {
            country: 'US',
            saleability: 'FOR_SALE',
            isEbook: true,
            listPrice: {
                amount: 74.36,
                currencyCode: 'USD'
            },
            retailPrice: {
                amount: 59.49,
                currencyCode: 'USD'
            },
            buyLink:
                'https://play.google.com/store/books/details?id=wqfcAwAAQBAJ&rdid=book-wqfcAwAAQBAJ&rdot=1&source=gbs_api',
            offers: [
                {
                    finskyOfferType: 1,
                    listPrice: {
                        amountInMicros: 74360000,
                        currencyCode: 'USD'
                    },
                    retailPrice: {
                        amountInMicros: 59490000,
                        currencyCode: 'USD'
                    },
                    giftable: true
                }
            ]
        },
        accessInfo: {
            country: 'US',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED',
            epub: {
                isAvailable: true,
                acsTokenLink:
                    'http://books.google.com/books/download/Discovering_and_Using_Historical_Geograp-sample-epub.acsm?id=wqfcAwAAQBAJ&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
            },
            pdf: {
                isAvailable: true,
                acsTokenLink:
                    'http://books.google.com/books/download/Discovering_and_Using_Historical_Geograp-sample-pdf.acsm?id=wqfcAwAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
            },
            webReaderLink:
                'http://play.google.com/books/reader?id=wqfcAwAAQBAJ&hl=&source=gbs_api',
            accessViewStatus: 'SAMPLE',
            quoteSharingAllowed: false
        },
        searchInfo: {
            textSnippet:
                '... \u003cb\u003esearch_terms\u003c/b\u003e%3Ahydrograph&amp;scope=\u003cb\u003eSearch\u003c/b\u003e http://digitalcollections.northern.edu/cdm/\u003cb\u003esearch\u003c/b\u003e/collection/hmwrc Texas Angelo State University http://collections.swco.ttu.edu/\u003cb\u003esearch\u003c/b\u003e?query=map&amp;submit=Go Utah Utah State University http://digital&nbsp;...'
        }
    },
    {
        kind: 'books#volume',
        id: 'SaInCgAAQBAJ',
        etag: 'qPAqdk3vf5Y',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/SaInCgAAQBAJ',
        volumeInfo: {
            title: 'Advanced PHP for Flash',
            authors: [
                'Steve Webster',
                'Frank Rice',
                'James Dean Palmer',
                'Kev Sutherland',
                'Todd Marks',
                'Jacob Hanson',
                'Harvard Eide'
            ],
            publisher: 'Apress',
            publishedDate: '2013-11-11',
            description:
                "Advanced PHP for Flash is the follow-up to the hugely popular Foundation PHP for Flash. The main aim of this book is to extend the reader's knowledge of using PHP and MySQL to produce dynamic content for Flash. Essentially, it picks up the baton from the first book and runs with it until there's no more road. The book takes the reader from being an intermediate to an advanced PHP/Flash developer, and helps them create some awesome Flash-based web applications along the way. It covers the core PHP features, as well as some exciting extras, that follow on directly from the knowledge gained in the first chapter, and show the reader how to use them in real-world applications. This book covers: Sessions File Uploading Advanced MySQL Socket Functions PHP and XML Ming Plus fully functional case studies This book is aimed squarely at those readers who want to create dynamic Flash-based web applications, and especially at those who have finished the first book and are hungry for more. As this book is pitched at those with an intermediate knowledge of PHP (and a decent grasp of MySQL) it has the advantage of being useful to both programmers and those coming over from the first book.",
            industryIdentifiers: [
                {
                    type: 'ISBN_13',
                    identifier: '9781430252054'
                },
                {
                    type: 'ISBN_10',
                    identifier: '1430252057'
                }
            ],
            readingModes: {
                text: false,
                image: true
            },
            pageCount: 491,
            printType: 'BOOK',
            categories: ['Computers'],
            maturityRating: 'NOT_MATURE',
            allowAnonLogging: false,
            contentVersion: '0.4.1.0.preview.1',
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false
            },
            imageLinks: {
                smallThumbnail:
                    'http://books.google.com/books/content?id=SaInCgAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail:
                    'http://books.google.com/books/content?id=SaInCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'en',
            previewLink:
                'http://books.google.com/books?id=SaInCgAAQBAJ&pg=PA122&dq=search_terms&hl=&cd=8&source=gbs_api',
            infoLink:
                'http://books.google.com/books?id=SaInCgAAQBAJ&dq=search_terms&hl=&source=gbs_api',
            canonicalVolumeLink:
                'https://books.google.com/books/about/Advanced_PHP_for_Flash.html?hl=&id=SaInCgAAQBAJ'
        },
        saleInfo: {
            country: 'US',
            saleability: 'NOT_FOR_SALE',
            isEbook: false
        },
        accessInfo: {
            country: 'US',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED',
            epub: {
                isAvailable: false
            },
            pdf: {
                isAvailable: true,
                acsTokenLink:
                    'http://books.google.com/books/download/Advanced_PHP_for_Flash-sample-pdf.acsm?id=SaInCgAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
            },
            webReaderLink:
                'http://play.google.com/books/reader?id=SaInCgAAQBAJ&hl=&source=gbs_api',
            accessViewStatus: 'SAMPLE',
            quoteSharingAllowed: false
        },
        searchInfo: {
            textSnippet:
                '... \u003cb\u003esearch\u003c/b\u003e our recipe database . We will assume the user provides a space - delimited list of \u003cb\u003esearch terms\u003c/b\u003e in the variable $ \u003cb\u003esearch_terms\u003c/b\u003e . We will explode this list into an array of terms and match against each one . Since we want to find&nbsp;...'
        }
    },
    {
        kind: 'books#volume',
        id: 'NJdDEAAAQBAJ',
        etag: '547hOkYTg50',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/NJdDEAAAQBAJ',
        volumeInfo: {
            title: 'The Mythic Mr. Lincoln',
            subtitle: "America's Favorite President in Multimedia Fiction",
            authors: ['Jeff O’Bryant'],
            publisher: 'McFarland',
            publishedDate: '2021-09-10',
            description:
                "Honest Abe. The rail-splitter. The Great Emancipator. Old Abe. These are familiar monikers of Abraham Lincoln. They describe a man who has influenced the lives of everyday people as well as notables like Leo Tolstoy, Marilyn Monroe, and Winston Churchill. But there is also a multitude of fictional Lincolns almost as familiar as the original: time traveler, android, monster hunter. This book explores Lincoln's evolution from martyred president to cultural icon and the struggle between the Lincoln of history and his fictional progeny. He has been Simpsonized by Matt Groening, charmed by Shirley Temple, and emulated by the Lone Ranger. Devotees have attempted to clone him or to raise him from the dead. Lincoln's image and memory have been invoked to fight communism, mock a sitting president, and sell products. Lincoln has even been portrayed as the greatest example of goodness humanity has to offer. In short, Lincoln is the essential American myth.",
            industryIdentifiers: [
                {
                    type: 'ISBN_13',
                    identifier: '9781476686028'
                },
                {
                    type: 'ISBN_10',
                    identifier: '1476686025'
                }
            ],
            readingModes: {
                text: false,
                image: true
            },
            pageCount: 231,
            printType: 'BOOK',
            categories: ['History'],
            maturityRating: 'NOT_MATURE',
            allowAnonLogging: false,
            contentVersion: '0.0.1.0.preview.1',
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false
            },
            imageLinks: {
                smallThumbnail:
                    'http://books.google.com/books/content?id=NJdDEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail:
                    'http://books.google.com/books/content?id=NJdDEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'en',
            previewLink:
                'http://books.google.com/books?id=NJdDEAAAQBAJ&pg=PA191&dq=search_terms&hl=&cd=9&source=gbs_api',
            infoLink:
                'http://books.google.com/books?id=NJdDEAAAQBAJ&dq=search_terms&hl=&source=gbs_api',
            canonicalVolumeLink:
                'https://books.google.com/books/about/The_Mythic_Mr_Lincoln.html?hl=&id=NJdDEAAAQBAJ'
        },
        saleInfo: {
            country: 'US',
            saleability: 'NOT_FOR_SALE',
            isEbook: false
        },
        accessInfo: {
            country: 'US',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED',
            epub: {
                isAvailable: false
            },
            pdf: {
                isAvailable: true,
                acsTokenLink:
                    'http://books.google.com/books/download/The_Mythic_Mr_Lincoln-sample-pdf.acsm?id=NJdDEAAAQBAJ&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
            },
            webReaderLink:
                'http://play.google.com/books/reader?id=NJdDEAAAQBAJ&hl=&source=gbs_api',
            accessViewStatus: 'SAMPLE',
            quoteSharingAllowed: false
        },
        searchInfo: {
            textSnippet:
                '... \u003cb\u003esearch\u003c/b\u003e ? \u003cb\u003esearch_terms\u003c/b\u003e = lincoln &amp; geo_ location_terms = Springfield % 2C + IL ; and The Real Yellow Pages ( website ) , &#39; Abe&#39;s &#39; in Springfield , IL , accessed on January 26 , 2020 , https://www.yellowpages.com/ \u003cb\u003esearch\u003c/b\u003e ? \u003cb\u003esearch_terms\u003c/b\u003e&nbsp;...'
        }
    },
    {
        kind: 'books#volume',
        id: 'GL2kAwAAQBAJ',
        etag: 'w7axospCZrc',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/GL2kAwAAQBAJ',
        volumeInfo: {
            title: 'The Rails 4 Way',
            authors: ['Obie Fernandez', 'Kevin Faustino'],
            publisher: 'Addison-Wesley Professional',
            publishedDate: '2014-05-26',
            description:
                'The “Bible” for Rails Development: Now Fully Updated for Rails 4.1 "When I read The Rails Way for the first time, I felt like I truly understood Rails for the first time.” —From the Foreword by Steve Klabnik Ruby on Rails 4 is leaner, tighter, and even more valuable to professional web developers. More than ever, it helps you focus on what matters most: delivering business value via clean and maintainable code. The RailsTM 4 Way is the only comprehensive, authoritative guide to delivering production-quality code with Rails 4. Kevin Faustino joins pioneering Rails developer Obie Fernandez to illuminate the entire Rails 4 API, including its most powerful and modern idioms, design approaches, and libraries. They present extensive new and updated content on security, performance, caching, Haml, RSpec, Ajax, the Asset Pipeline, and more. Through detailed code examples, you’ll dive deep into the Rails 4 code base, discover why Rails is designed as it is, and learn how to make it do exactly what you want. Proven in dozens of production systems, this book’s techniques will maximize your productivity and help you build more successful solutions. You’ll want to keep this guide by your computer—you’ll refer to it constantly. This guide will help you Build powerful, scalable REST-compliant APIs Program complex program flows using Action Controller Represent models, relationships, CRUD operations, searches, validation, callbacks, and more Smoothly evolve application database schema via Migrations Apply advanced Active Record techniques: single-table inheritance, polymorphic models, and more Create visual elements with Action View and partials Optimize performance and scalability with view caching Master the highly productive Haml HTML templating engine Make the most of Rails’ approach to session management Secure your systems with Rails 4’s improved authentication and authorization Resist SQL Injection, XSS, XSRF, and other attacks Extend Rails with popular gems and plugins, and learn to write your own Integrate email services with Action Mailer Use Ajax via Rails 4 support for unobtrusive JavaScript Improve responsiveness with background processing Leverage Asset Pipeline to simplify development, improve perceived performance, and reduce server burdens Accelerate implementation and promote maintainability with RSpec',
            industryIdentifiers: [
                {
                    type: 'ISBN_13',
                    identifier: '9780133487930'
                },
                {
                    type: 'ISBN_10',
                    identifier: '0133487938'
                }
            ],
            readingModes: {
                text: true,
                image: true
            },
            pageCount: 872,
            printType: 'BOOK',
            categories: ['Computers'],
            averageRating: 1,
            ratingsCount: 1,
            maturityRating: 'NOT_MATURE',
            allowAnonLogging: true,
            contentVersion: '2.212.208.0.preview.3',
            panelizationSummary: {
                containsEpubBubbles: false,
                containsImageBubbles: false
            },
            imageLinks: {
                smallThumbnail:
                    'http://books.google.com/books/content?id=GL2kAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                thumbnail:
                    'http://books.google.com/books/content?id=GL2kAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
            },
            language: 'en',
            previewLink:
                'http://books.google.com/books?id=GL2kAwAAQBAJ&pg=PA484&dq=search_terms&hl=&cd=10&source=gbs_api',
            infoLink:
                'https://play.google.com/store/books/details?id=GL2kAwAAQBAJ&source=gbs_api',
            canonicalVolumeLink:
                'https://play.google.com/store/books/details?id=GL2kAwAAQBAJ'
        },
        saleInfo: {
            country: 'US',
            saleability: 'FOR_SALE',
            isEbook: true,
            listPrice: {
                amount: 33.99,
                currencyCode: 'USD'
            },
            retailPrice: {
                amount: 18.35,
                currencyCode: 'USD'
            },
            buyLink:
                'https://play.google.com/store/books/details?id=GL2kAwAAQBAJ&rdid=book-GL2kAwAAQBAJ&rdot=1&source=gbs_api',
            offers: [
                {
                    finskyOfferType: 1,
                    listPrice: {
                        amountInMicros: 33990000,
                        currencyCode: 'USD'
                    },
                    retailPrice: {
                        amountInMicros: 18350000,
                        currencyCode: 'USD'
                    },
                    giftable: true
                }
            ]
        },
        accessInfo: {
            country: 'US',
            viewability: 'PARTIAL',
            embeddable: true,
            publicDomain: false,
            textToSpeechPermission: 'ALLOWED_FOR_ACCESSIBILITY',
            epub: {
                isAvailable: false
            },
            pdf: {
                isAvailable: false
            },
            webReaderLink:
                'http://play.google.com/books/reader?id=GL2kAwAAQBAJ&hl=&source=gbs_api',
            accessViewStatus: 'SAMPLE',
            quoteSharingAllowed: false
        },
        searchInfo: {
            textSnippet:
                '... [:\u003cb\u003esearch_terms\u003c/b\u003e]}%&#39;&quot;&quot;) 4 end 5 end For a \u003cb\u003esearch\u003c/b\u003e string “test,” this code will execute the following SQL query: SELECT * FROM products WHERE name LIKE &#39;&quot;%test%&#39;&quot;; This is OK so far. But what if the user submits \u003cb\u003esearch_terms\u003c/b\u003e with a value of&nbsp;...'
        }
    }
];

export const bookScans: ScanItem[] = [
    {
        id: '1',
        book: books[0],
        date: '1718593069870',
        bookId: books[0].id
    },
    {
        id: '2',
        book: books[1],
        date: '1718593069870',
        bookId: books[1].id
    },
    {
        id: '3',
        book: books[2],
        date: '1718593069870',
        bookId: books[2].id
    },
    {
        id: '4',
        book: books[3],
        date: '1718593069870',
        bookId: books[3].id
    },
    {
        id: '5',
        book: books[4],
        date: '1718593069870',
        bookId: books[4].id
    },
    {
        id: '6',
        book: books[5],
        date: '1718593069870',
        bookId: books[5].id
    },
    {
        id: '7',
        book: books[6],
        date: '1718593069870',
        bookId: books[6].id
    },
    {
        id: '8',
        book: books[7],
        date: '1718593069870',
        bookId: books[7].id
    }
];
