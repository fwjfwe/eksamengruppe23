export default {
  name: 'user',
  type: 'document',
  title: 'Bruker',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Navn',
    },
    {
      name: 'gender',
      type: 'string',
      title: 'Kjønn',
      options: {
        list: ['Mann', 'Kvinne', 'Annet'],
      },
    },
    {
      name: 'age',
      type: 'number',
      title: 'Alder',
    },
    {
      name: 'previousPurchases',
      type: 'array',
      title: 'Tidligere kjøp',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    },
    {
      name: 'wishlist',
      type: 'array',
      title: 'Ønskeliste',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    }
  ],
};