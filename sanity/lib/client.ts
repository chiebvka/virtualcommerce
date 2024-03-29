import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn, tokens } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: tokens,
})
