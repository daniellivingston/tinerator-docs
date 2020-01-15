import { graphql } from 'utils/graphql';

interface ValidationError {
  field: string;
  message: string;
  code: string;
  properties: object;
}

type UpdateSitePayload =
  | {
      success: true;
      errors: [];
      site: {
        id: string;
      };
    }
  | { success: false; errors: ValidationError[] };

/**
 * Updates a site name.
 *
 * @param siteId - the site id
 * @param name - the new name of the site
 * @param token - the auth token
 */
export async function updateSiteName(
  siteId: string,
  name: string,
  token: string
): Promise<UpdateSitePayload> {
  const query = `
    mutation UpdateSiteName(
      $siteId: ID!
      $name: String!
    ) {
      updateSite(
        siteId: $siteId,
        name: $name
      ) {
        success
        errors {
          field
          message
        }
        site {
          id
        }
      }
    }
  `;

  const resp = await graphql(query, { siteId, name }, token);
  const body = await resp.json();
  return body.data.updateSite as UpdateSitePayload;
}
