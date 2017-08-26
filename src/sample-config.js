export const products = [
  {
    name: 'Caliber',
    values: ['9mm', '.38 SC', '.40', '10mm', '.45'],
    default: '.40'
  },
  {
    name: 'Top End Options',
    variations: [
      {
        name: 'Compensated',
        type: Boolean,
        values: [true, false],
        default: true
      },
      {
        name: 'Barrel Configuration',
        values: ['Standard', '3/4" Tungsten Sleeve', '3/4" Bull Barrel', 'Bushing', 'Sightblock'],
        default: '3/4" Tungsten Sleeve'
      },
      {
        name: 'Length',
        type: Number,
        values: [4.25, 4.5, 5, 5.4, 6],
        default: 4.5,
        constraints: [
          {
            when: {
              source: 'Top End Options.Compensated',
              is: true
            },
            enableOnly: [4.5, 5]
          },
          {
            when: {
              source: 'Top End Options.Compensated',
              is: false
            },
            disable: [4.5]
          },
          {
            when: {
              source: 'Top End Options.Barrel Configuration',
              is: 'Bushing'
            },
            enableOnly: [4.25, 5, 6]
          },
          {
            when: {
              source: 'Top End Options.Barrel Configuration',
              is: 'Sightblock'
            },
            enableOnly: [5, 5.4, 6]
          }
        ]
      },
      {
        name: 'w/ Popple Holes',
        type: Boolean,
        values: [true, false],
        default: true,
        constraints: [
          {
            when: {
              source: 'Top End Options.Compensated',
              is: false
            },
            disable: [true]
          }
        ]
      }
    ]
  },
  {
    name: 'Performance Options',
    multiSelect: true,
    values: ['Stroked', 'Front Internal Lightening', 'Rear Internal Lightening'],
    default: ['Stroked', 'Rear Internal Lightening'],
    constraints: [
      {
        when: {
          source: 'Top End Options.Barrel Configuration',
          in: ['3/4" Tungsten Sleeve`, `3/4" Bull Barrel']
        },
        disable: ['Front Internal Lightening', 'Rear Internal Lightening']
      }
    ]
  },
  {
    name: 'Slide Options',
    variations: [
      {
        name: 'Slide Length',
        hidden: true,
        values: [4.25, 4.5, 5, 5.4, 6],
        master: 'Top End Options.Length'
      },
      {
        name: 'Top',
        values: ['Top', 'Flat Top', 'Tri-Top', 'Partial Tri-Top', 'Round', 'Signature'],
        default: 'Signature'
      },
      {
        name: 'Serrations',
        values: ['4 LPI', '8 LPI', 'Signature'],
        default: 'Signature'
      },
      {
        name: 'Panel Cuts',
        type: Boolean,
        values: [true, false],
        default: true
      },
      {
        name: 'Front Serrations',
        values: ['Standard', 'Reverse High Power', 'Butler', 'High Power', '4 LPI', '8 LPI', 'Signature'],
        default: 'Signature'
      },
      {
        name: 'Material',
        values: ['Stainless', 'Carbon Steel'],
        default: 'Carbon Steel'
      }
    ]
  },
  {
    name: 'Frame Options',
    variations: [
      {
        name: 'Configuration',
        values: ['Long Wide', 'Heavy Long Wide', 'Tactical'],
        default: 'Heavy Long Wide'
      },
      {
        name: 'Length',
        values: ['Butler', 'Full', 'Standard'],
        default: 'Full',
        constraints: [
          {
            when: 'Top End Options.Length',
            greaterThan: 5,
            disable: ['Full']
          }
        ]
      },
      {
        name: 'Material',
        values: ['Steel', 'Stainless', 'Aluminum'],
        default: 'Steel'
      }
    ]
  },
  {
    name: 'Grip Options',
    variations: [
      {
        name: 'Material',
        values: ['Steel', 'Stainless', 'Aluminum', 'Polymer'],
        default: 'Steel'
      },
      {
        name: 'Length',
        values: ['Full-Size', 'Compact'],
        default: 'Full-Size',
        constraints: [
          {
            when: 'Magwell',
            is: 'Compact',
            exclude: ['Competition']
          }
        ]
      },
      {
        name: 'Grip Texture',
        values: ['WarDrum Medium', 'WarDrum Velvet', 'Signature Aggressive', 'Signature Blank', 'Signature Medium'],
        default: 'Signature Blank'
      }
    ]
  },
  {
    name: 'Magwell',
    values: ['Competition', 'Compact', 'None'],
    default: 'Competition'
  },
  {
    name: 'Thumb Safety',
    variations: [
      {
        name: 'Paddle',
        type: Array,
        variations: [
          {
            name: 'Ambi',
            type: Boolean,
            values: [true, false],
            default: true
          },
          {
            name: 'Shield',
            type: Boolean,
            values: [true, false],
            default: true
          }
        ]
      },
      {
        name: 'Width',
        values: ['Wide', 'Extra Wide'],
        default: 'Extra Wide'
      }
    ]
  },
  {
    name: 'Sights',
    values: ['Tritium Novak', 'Adjustable Bomar w/ Fiber Front', 'RTS2', 'RMR w/ Tritium'],
    default: 'Adjustable Bomar w/ Fiber Front'
  },
  {
    name: 'Slide Racker',
    type: Boolean,
    values: [true, false],
    default: false
  },
  {
    name: 'Gas Pedal',
    type: Boolean,
    values: [true, false],
    default: false
  },
  {
    name: 'Guide Rod',
    values: ['FLGR', 'GI', 'Tungsten FLGR'],
    default: 'FLGR'
  },
  {
    name: 'Trigger',
    variations: [
      {
        name: 'Length',
        values: ['Standard', 'Long', 'Short'],
        default: 'Standard'
      },
      {
        name: 'Shape',
        values: ['Flat', 'Curved'],
        default: 'Flat'
      },
      {
        name: 'Weight',
        type: 'range',
        min: 2.0,
        max: 4.75,
        increment: 0.25,
        default: 2.75
      }
    ]
  },
  {
    name: 'Grip Safety Pinned',
    type: Boolean,
    values: [true, false],
    default: false
  },
  {
    name: 'Custom Serial',
    type: '? Fill in your own'
  }
];

export const productMap = new Map();
products.forEach(item => productMap.set(item.name, item));

export const shopify = {
  client: {
    accessToken: 'cccc9170b9d1911d095a199a51df92d4',
    domain: 'rails-test-42.myshopify.com',
    appId: '6'
  },
  collection: {
    id: 442402061
  }
};
