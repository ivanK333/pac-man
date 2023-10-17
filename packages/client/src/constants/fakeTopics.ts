import { TTopic } from '../api';
import defaultImage from '../../src/assets/images/default-avatar.svg';
import image1 from '../../src/assets/images/сорри.jpg';
import image2 from '../../src/assets/images/несорри.jpg';

// export const fakeTopics: TTopic[] = [
//   {
//     topicName: 'Pacman',
//     messages: [
//       {
//         message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//         Curabitur ac varius tortor. Cras viverra facilisis lectus ut sodales.
//         Integer aliquam lacus odio, id ornare libero placerat in.
//         Donec volutpat laoreet elementum. Duis laoreet eleifend pellentesque.
//         Etiam efficitur nisi urna, id pulvinar nisi tempor quis. In eu volutpat sem, eu lacinia mauris.`,
//         createdAt: '12:33',
//         user: {
//           name: '20lettersloginlength',
//           avatar: image1,
//           id: '234234',
//         },
//         id: '1',
//         comments: [
//           {
//             user: {
//               name: '20LETTERSLOGINLENGTH',
//               avatar: image2,
//               id: '234254',
//             },
//             comment: `Nunc et eros a ex semper venenatis sed nec dolor.
//             Vestibulum dapibus consectetur quam, a ultrices libero pellentesque et.
//             Nullam lobortis faucibus auctor. Sed cursus, nibh a gravida porttitor,
//             lorem lacus maximus elit, ut dictum odio nisi et neque.
//             Aenean pulvinar vulputate nisi tincidunt sollicitudin.
//             Donec feugiat rhoncus lacus, vehicula rhoncus erat varius vitae.
//             Pellentesque faucibus vestibulum molestie.`,
//             createdAt: '12:33',
//             likes: [],
//             emojis: [],
//             id: '1',
//           },
//           {
//             user: {
//               name: '20LETTERSLOGINLENGTH',
//               avatar: image2,
//               id: '234254',
//             },
//             comment: `Nullam at turpis id libero tincidunt tincidunt.
//             Maecenas gravida commodo sem sed bibendum. Vestibulum in feugiat nibh.
//             Interdum et malesuada fames ac ante ipsum primis in faucibus.
//             Duis mollis mi sed velit pretium dictum. Donec ac pellentesque urna.
//             Fusce hendrerit, felis et rutrum feugiat,
//             dolor tellus eleifend nunc, et placerat turpis neque in nulla.
//             Suspendisse hendrerit nisl et enim molestie molestie.
//             Nunc et molestie purus. Nullam condimentum laoreet maximus.`,
//             createdAt: '12:33',
//             likes: [],
//             emojis: [],
//             id: '2',
//           },
//         ],
//         likes: [],
//         emojis: [],
//       },
//       {
//         message: `Aliquam scelerisque neque ac nulla efficitur viverra a at ante.
//         Quisque nec dolor in libero scelerisque accumsan quis et felis.
//         Quisque efficitur vulputate lectus, vitae pulvinar sapien elementum a.
//         Sed eleifend placerat diam id laoreet. Ut sodales semper erat, ut interdum felis aliquam at.
//         Quisque mollis eu arcu a feugiat. Vestibulum eu iaculis nulla. Ut ornare aliquet tortor sit amet sollicitudin.`,
//         user: {
//           name: '20LETTERSLOGINLENGTH',
//           avatar: image2,
//           id: '234254',
//         },
//         createdAt: '12:33',
//         id: '2',
//         comments: [],
//         likes: [],
//         emojis: [],
//       },
//       {
//         message: `Praesent fringilla iaculis nulla ut vulputate.
//         Quisque vel risus suscipit, faucibus purus vel, tincidunt neque.
//         Sed sed odio erat. In id felis tortor.
//         Curabitur imperdiet diam et nibh facilisis, et dignissim risus condimentum.
//         Nunc malesuada id tellus non porta. Nulla quis imperdiet neque, vel iaculis eros.
//         In vestibulum lacus non lorem fringilla pulvinar. Duis dictum maximus dignissim.
//         Nullam gravida, tortor at vulputate faucibus, ante justo ullamcorper dui, nec rutrum tellus tellus non libero.
//         Donec et nunc eget odio vehicula ultrices quis in risus.`,
//         user: {
//           name: 'username',
//           avatar: defaultImage,
//           id: '111111',
//         },
//         createdAt: '12:43',
//         id: '3',
//         likes: [],
//         emojis: [],
//         comments: [
//           {
//             user: {
//               name: 'username',
//               avatar: defaultImage,
//               id: '111111',
//             },
//             comment: `Nunc et eros a ex semper venenatis sed nec dolor.
//             Vestibulum dapibus consectetur quam, a ultrices libero pellentesque et.
//             Nullam lobortis faucibus auctor. Sed cursus, nibh a gravida porttitor,
//             lorem lacus maximus elit, ut dictum odio nisi et neque.
//             Aenean pulvinar vulputate nisi tincidunt sollicitudin.
//             Donec feugiat rhoncus lacus, vehicula rhoncus erat varius vitae.
//             Pellentesque faucibus vestibulum molestie.`,
//             createdAt: '12:33',
//             likes: [],
//             emojis: [],
//             id: '1',
//           },
//         ],
//       },
//     ],
//     id: '123123223',
//   },
//   {
//     topicName: 'Not a Pacman',
//     messages: [
//       {
//         message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//         Curabitur ac varius tortor. Cras viverra facilisis lectus ut sodales.
//         Integer aliquam lacus odio, id ornare libero placerat in.
//         Donec volutpat laoreet elementum. Duis laoreet eleifend pellentesque.
//         Etiam efficitur nisi urna, id pulvinar nisi tempor quis. In eu volutpat sem, eu lacinia mauris.`,
//         user: {
//           name: '20lettersloginlength',
//           avatar: image1,
//           id: '234234',
//         },
//         createdAt: '12:33',
//         id: '1',
//         comments: [],
//         likes: [],
//         emojis: [],
//       },
//       {
//         message: `Aliquam scelerisque neque ac nulla efficitur viverra a at ante.
//         Quisque nec dolor in libero scelerisque accumsan quis et felis.
//         Quisque efficitur vulputate lectus, vitae pulvinar sapien elementum a.
//         Sed eleifend placerat diam id laoreet. Ut sodales semper erat, ut interdum felis aliquam at.
//         Quisque mollis eu arcu a feugiat. Vestibulum eu iaculis nulla. Ut ornare aliquet tortor sit amet sollicitudin.`,
//         user: {
//           name: '20LETTERSLOGINLENGTH',
//           avatar: image2,
//           id: '234254',
//         },
//         createdAt: '12:33',
//         id: '2',
//         comments: [],
//         likes: [],
//         emojis: [],
//       },
//       {
//         message: `Praesent fringilla iaculis nulla ut vulputate.
//         Quisque vel risus suscipit, faucibus purus vel, tincidunt neque.
//         Sed sed odio erat. In id felis tortor.
//         Curabitur imperdiet diam et nibh facilisis, et dignissim risus condimentum.
//         Nunc malesuada id tellus non porta. Nulla quis imperdiet neque, vel iaculis eros.
//         In vestibulum lacus non lorem fringilla pulvinar. Duis dictum maximus dignissim.
//         Nullam gravida, tortor at vulputate faucibus, ante justo ullamcorper dui, nec rutrum tellus tellus non libero.
//         Donec et nunc eget odio vehicula ultrices quis in risus.`,
//         user: {
//           name: 'username',
//           avatar: defaultImage,
//           id: '111111',
//         },
//         createdAt: '12:43',
//         id: '3',
//         likes: [],
//         emojis: [],
//         comments: [
//           {
//             user: {
//               name: '20LETTERSLOGINLENGTH',
//               avatar: image2,
//               id: '234254',
//             },
//             comment: `Nunc et eros a ex semper venenatis sed nec dolor.
//             Vestibulum dapibus consectetur quam, a ultrices libero pellentesque et.
//             Nullam lobortis faucibus auctor. Sed cursus, nibh a gravida porttitor,
//             lorem lacus maximus elit, ut dictum odio nisi et neque.
//             Aenean pulvinar vulputate nisi tincidunt sollicitudin.
//             Donec feugiat rhoncus lacus, vehicula rhoncus erat varius vitae.
//             Pellentesque faucibus vestibulum molestie.`,
//             createdAt: '12:48',
//             likes: [],
//             emojis: [],
//             id: '1',
//           },
//         ],
//       },
//     ],
//     id: '123123123',
//   },
// ];
