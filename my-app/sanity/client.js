import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '8etmqag7',      
  dataset: 'production',
  apiVersion: '2024-05-05',         
  useCdn: true,                
})
