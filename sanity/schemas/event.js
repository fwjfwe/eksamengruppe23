export default {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Tittel',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Beskrivelse',
        type: 'text',
      },
      {
        name: 'date',
        title: 'Dato',
        type: 'datetime',
      },
      {
        name: 'location',
        title: 'Sted',
        type: 'string',
      },
    ],
}
  