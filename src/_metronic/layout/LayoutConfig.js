import { toAbsoluteUrl } from '../utils/utils';

export const initLayoutConfig = {
  demo: 'demo1',
  // == Base Layout
  self: {
    layout: 'fluid',
    // body: { "background-image": toAbsoluteUrl("/media/misc/bg-1.jpg") },
    logo: {
      dark: toAbsoluteUrl('/media/logos/logo-light.png'),
      light: toAbsoluteUrl('/media/logos/logo-dark.png'),
      brand: toAbsoluteUrl('/media/logos/logo-light.png'),
      green: toAbsoluteUrl('/media/logos/logo-light.png'),
    },
  },
  // == Portlet Plugin
  // portlet: {
  //   sticky: {
  //     offset: 50
  //   }
  // },
  // == Page Splash Screen loading
  loader: {
    enabled: true,
    type: 'spinner-logo',
    logo: toAbsoluteUrl('/media/logos/logo-mini-md.png'),
    message: 'Please wait...',
  },
  // == Colors for javascript
  colors: {
    state: {
      brand: '#025ea1',
      dark: '#003274',
      light: '#ffffff',
      primary: '#4596d1',
      success: '#5ba252',
      info: '#36a3f7',
      warning: '#f6b021',
      danger: '#c63032',
    },
    base: {
      label: ['#c5cbe3', '#a1a8c3', '#3d4465', '#3e4466'],
      shape: ['#f0f3ff', '#d9dffa', '#afb4d4', '#646c9a'],
    },
  },
  // page toolbar
  toolbar: {
    display: true,
  },
  header: {
    self: {
      width: 'fluid',
      skin: 'light',
      fixed: {
        desktop: true,
        mobile: true,
      },
    },
    menu: {
      self: {
        display: true,
        layout: 'default',
        'root-arrow': false,
        'icon-style': 'duotone',
      },
      desktop: {
        arrow: true,
        toggle: 'click',
        submenu: {
          skin: 'light',
          arrow: true,
        },
      },
      mobile: {
        submenu: {
          skin: 'dark',
          accordion: true,
        },
      },
    },
  },
  subheader: {
    display: false,
    displayDesc: false,
    displayDaterangepicker: true,
    layout: 'subheader-v1',
    fixed: false,
    width: 'fluid',
    clear: false,
    style: 'solid',
  },
  content: {
    width: 'fluid',
  },
  brand: {
    self: {
      skin: 'light',
    },
  },
  aside: {
    self: {
      skin: 'light',
      display: false,
      fixed: false,
      minimize: {
        toggle: false,
        default: false,
      },
    },
    footer: {
      self: {
        display: true,
      },
    },
    menu: {
      dropdown: 'false',
      scroll: false,
      'icon-style': 'duotone',
      submenu: {
        accordion: true,
        dropdown: {
          arrow: true,
          'hover-timeout': 100,
        },
      },
    },
  },
  footer: {
    self: {
      width: 'fluid',
      fixed: false,
    },
  },
};

const LayoutConfig = JSON.parse(JSON.stringify(initLayoutConfig)); // deep object copy
export default LayoutConfig;
