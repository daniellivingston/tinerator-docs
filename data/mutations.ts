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

interface User {
  email: string;
}

interface UpdateUserParams {
  email?: string;
  currentPassword?: string;
  password?: string;
}

type UpdateUserPayload =
  | {
      success: true;
      errors: [];
      user: User;
    }
  | { success: false; errors: ValidationError[] };

/**
 * Updates a user.
 *
 * @param params - the new user params
 * @param token - the auth token
 */
export async function updateUser(
  params: UpdateUserParams,
  token: string
): Promise<UpdateUserPayload> {
  const query = `
    mutation UpdateUser(
      $email: String,
      $currentPassword: String,
      $password: String
    ) {
      updateUser(
        email: $email,
        currentPassword: $currentPassword,
        password: $password
      ) {
        success
        errors {
          field
          message
        }
        user {
          email
        }
      }
    }
  `;

  const resp = await graphql(query, params, token);
  const body = await resp.json();
  return body.data.updateUser as UpdateUserPayload;
}

interface UpdatePlanParams {
  siteId: string;
  planId: string;
  stripeCardToken?: string;
}

type UpdatePlanPayload =
  | {
      success: true;
      errors: [];
    }
  | { success: false; errors: ValidationError[] };

/**
 * Updates the billing plan.
 *
 * @param params - the new plan params
 * @param token - the auth token
 */
export async function updatePlan(
  params: UpdatePlanParams,
  token: string
): Promise<UpdatePlanPayload> {
  const query = `
    mutation UpdatePlan(
      $siteId: ID!,
      $planId: String!,
      $stripeCardToken: String
    ) {
      updatePlan(
        siteId: $siteId,
        planId: $planId,
        stripeCardToken: $stripeCardToken
      ) {
        success
        errors {
          field
          message
        }
      }
    }
  `;

  const resp = await graphql(query, params, token);
  const body = await resp.json();
  return body.data.updatePlan as UpdatePlanPayload;
}
