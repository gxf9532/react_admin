export const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: 'home'
    },
    
    {
        title: '商品',
        key: '/good',
        icon: 'mail',
        childMenu: [
            {
                title: '商品管理',
                key: '/goods',
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