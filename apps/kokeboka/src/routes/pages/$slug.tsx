
import { createFileRoute } from '@tanstack/react-router'
import { client as sanityClient } from '../../sanity/client'
import PageBuilder from '../../components/PageBuilder'

export const Route = createFileRoute('/pages/$slug')({
  component: PageComponent,
  loader: async ({ params }) => {
    const query = `*[_type == "page" && slug.current == $slug][0] {
      title,
      modules[] {
        ...,
        _type == "recipeCard" => {
          ...,
          recipe-> {
            _id,
            title,
            "image": mainImage {
                asset->{
                    url
                },
                alt,
                caption
            }
          },
          overrideImage {
              asset->{
                  url
              }
          }
        },
        _type == "hero" => {
            ...,
            image {
                asset->{
                    url
                },
                alt
            }
        },
        _type == "imageModule" => {
            ...,
            image {
                asset->{
                    url
                },
                alt,
                caption
            }
        },
          _type == "button" => {
            ...,
            modal {
                ...,
                internalLink->{
                    _type,
                    _id,
                    slug
                }
            }
        }
      }
    }`
    const page = await sanityClient.fetch(query, { slug: params.slug })
    if (!page) {
      throw new Error('Page not found')
    }
    return { page }
  },
})

function PageComponent() {
  const { page } = Route.useLoaderData()

  return (
    <div>
      <PageBuilder modules={page.modules} />
    </div>
  )
}
