export default {
  name: 'event',
  type: 'document',
  title: 'Event',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Tittel på arrangementet',
    },
    {
      name: 'apiId',
      type: 'string',
      title: 'API ID',
      description: 'ID hentet fra Ticketmaster sitt API',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Kategori',
      options: {
        list: ['Sport', 'Show', 'Festival'],
      }
    }
  ],
};