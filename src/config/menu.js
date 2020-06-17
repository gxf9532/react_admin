export const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'home'
    },
    
    {
        title: '商品',
        key: '/products',
        icon: 'mail',
        childMenu: [
            {
                title: '商品管理',
                key: '/product',
                icon: 'shop'
            },
            {
                title: '分类管理',
                key: '/category',
                icon: 'linkedin'
            }
        ]
    }

]