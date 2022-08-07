const layout = [
  [
    {
      name: 'firstname',
      intlLabel: {
        id: 'Auth.form.name.labels',
        defaultMessage: 'Name',
      },
      placeholder: {
        id: 'Auth.form.name.placeholder',
        defaultMessage: 'e.g. Hatchet',
      },
      type: 'text',
      size: {
        col: 6,
        xs: 12,
      },
      required: true,
    },
  ],
  [
    {
      intlLabel: {
        id: 'Auth.form.symbol.label',
        defaultMessage: 'SymbolAddress',
      },
      name: 'email',
      placeholder: {
        id: 'Auth.form.symbol.placeholder',
        defaultMessage: 'e.g. TDR5AFR3Y5AMKP4GRSCMJERFQ7MEVEE5C7TKWXA',
      },
      type: 'email',
      size: {
        col: 6,
        xs: 12,
      },
      required: true,
    },
  ],
];

export default layout;
