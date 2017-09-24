export const products = [
  {
    title: 'Caliber',
    options: ['9mm', '.38 SC', '.40', '10mm', '.45'],
    default: '.40'
  },
  {
    title: 'Top End Options',
    variations: [
      {
        title: 'Compensated',
        type: Boolean,
        options: [true, false],
        default: true
      },
      {
        title: 'Barrel Configuration',
        options: ['Standard', '3/4" Tungsten Sleeve', '3/4" Bull Barrel', 'Bushing', 'Sightblock'],
        default: '3/4" Tungsten Sleeve',
        constraints: [
          {
            when: {
              source: 'Top End Options.Compensated',
              is: true
            },
            disable: ['Bushing', 'Sightblock']
          }
        ]
      },
      {
        title: 'Length',
        type: Number,
        options: [4.25, 4.5, 5, 5.4, 6],
        default: 4.5,
        constraints: [
          {
            when: {
              source: 'Top End Options.Compensated',
              is: true
            },
            enable: [4.5, 5]
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
            enable: [4.25, 5, 6]
          },
          {
            when: {
              source: 'Top End Options.Barrel Configuration',
              is: 'Sightblock'
            },
            enable: [5, 5.4, 6]
          }
        ]
      },
      {
        title: 'w/ Popple Holes',
        type: Boolean,
        options: [true, false],
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
    title: 'Performance Options',
    multiSelect: true,
    options: ['Stroked', 'Front Internal Lightening', 'Rear Internal Lightening'],
    default: ['Stroked', 'Rear Internal Lightening'],
    constraints: [
      {
        when: {
          source: 'Top End Options.Barrel Configuration',
          in: ['3/4" Tungsten Sleeve', '3/4" Bull Barrel']
        },
        disable: ['Front Internal Lightening']
      }
    ]
  },
  {
    title: 'Slide Options',
    variations: [
      {
        title: 'Slide Length',
        hidden: true,
        options: [4.25, 4.5, 5, 5.4, 6],
        master: 'Top End Options.Length'
      },
      {
        title: 'Top',
        options: ['Top', 'Flat Top', 'Tri-Top', 'Partial Tri-Top', 'Round', 'Signature'],
        default: 'Signature'
      },
      {
        title: 'Serrations',
        options: ['4 LPI', '8 LPI', 'Signature'],
        default: 'Signature'
      },
      {
        title: 'Panel Cuts',
        type: Boolean,
        options: [true, false],
        default: true
      },
      {
        title: 'Front Serrations',
        options: ['Standard', 'Reverse High Power', 'Butler', 'High Power', '4 LPI', '8 LPI', 'Signature'],
        default: 'Signature'
      },
      {
        title: 'Material',
        options: ['Stainless', 'Carbon Steel'],
        default: 'Carbon Steel'
      }
    ]
  },
  {
    title: 'Frame Options',
    variations: [
      {
        title: 'Configuration',
        options: ['Long Wide', 'Heavy Long Wide', 'Tactical'],
        default: 'Heavy Long Wide'
      },
      {
        title: 'Length',
        options: ['Butler', 'Full', 'Standard'],
        default: 'Full',
        constraints: [
          {
            when: {
              source: 'Top End Options.Length',
              greaterThan: 5
            },
            disable: ['Full']
          }
        ]
      },
      {
        title: 'Material',
        options: ['Steel', 'Stainless', 'Aluminum'],
        default: 'Steel'
      }
    ]
  },
  {
    title: 'Grip Options',
    variations: [
      {
        title: 'Material',
        options: ['Steel', 'Stainless', 'Aluminum', 'Polymer'],
        default: 'Steel'
      },
      {
        title: 'Length',
        options: ['Full-Size', 'Compact'],
        default: 'Full-Size',
        // I'm not entirely sure how to interpret the magwell/grip length constraints Is it basically, "when length
        // is full-size, disable compact, and when it's compact, disable full-size?"
        constraints: [
          {
            when: {
              source: 'Magwell',
              in: ['Compact', 'None']
            },
            disable: ['Full-Size']
          }
        ]
      },
      {
        title: 'Grip Texture',
        options: ['WarDrum Medium', 'WarDrum Velvet', 'Signature Aggressive', 'Signature Blank', 'Signature Medium'],
        default: 'Signature Blank'
      }
    ]
  },
  {
    title: 'Magwell',
    options: ['Competition', 'Compact', 'None'],
    default: 'Competition'
  },
  {
    title: 'Thumb Safety',
    variations: [
      {
        title: 'Paddle',
        type: Array,
        variations: [
          {
            title: 'Ambi',
            type: Boolean,
            options: [true, false],
            default: true
          },
          {
            title: 'Shield',
            type: Boolean,
            options: [true, false],
            default: true
          }
        ]
      },
      {
        title: 'Width',
        options: ['Wide', 'Extra Wide'],
        default: 'Extra Wide'
      }
    ]
  },
  {
    title: 'Sights',
    options: ['Tritium Novak', 'Adjustable Bomar w/ Fiber Front', 'RTS2', 'RMR w/ Tritium'],
    default: 'Adjustable Bomar w/ Fiber Front'
  },
  {
    title: 'Slide Racker',
    type: Boolean,
    options: [true, false],
    default: false
  },
  {
    title: 'Gas Pedal',
    type: Boolean,
    options: [true, false],
    default: false
  },
  {
    title: 'Guide Rod',
    options: ['FLGR', 'GI', 'Tungsten FLGR'],
    default: 'FLGR'
  },
  {
    title: 'Trigger',
    variations: [
      {
        title: 'Length',
        options: ['Standard', 'Long', 'Short'],
        default: 'Standard'
      },
      {
        title: 'Shape',
        options: ['Flat', 'Curved'],
        default: 'Flat'
      },
      {
        title: 'Weight',
        type: 'range',
        min: 2.0,
        max: 4.75,
        increment: 0.25,
        default: 2.75
      }
    ]
  },
  {
    title: 'Grip Safety Pinned',
    type: Boolean,
    options: [true, false],
    default: false
  },
  {
    title: 'Custom Serial',
    type: 'textbox'
  }
];

export const productMap = new Map();
products.forEach(item => productMap.set(item.title, item));

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
