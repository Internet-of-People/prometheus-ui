import Vue from 'vue';
import Router from 'vue-router';
import Introduction from '@/components/startup/Introduction';
import CreateNewVault from '@/components/startup/CreateNewVault';
import ValidateVault from '@/components/startup/ValidateVault';
import VaultCreation from '@/components/contents/VaultCreation';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'intro',
            component: Introduction,
        },
        {
            path: '/createnewvault',
            name: 'createNewVault',
            component: CreateNewVault,
            meta: {
                breadcrumb: [
                    {name: 'GENERATING MNEUMONIC'},
                    {name: 'VALIDATING', link: 'validateVault'},
                    {name: 'FINISH', link: 'vaultcreated'},
                ]
            }
        },
        {
            path: '/validatevault',
            name: 'validateVault',
            component: ValidateVault,
            meta: {
                breadcrumb: [
                    {name: 'GENERATING MNEUMONIC', link: 'createnewvault'},
                    {name: 'VALIDATING'},
                    {name: 'FINISH', link: 'vaultcreated'},
                ]
            }
        },
        {
            path: '/vaultcreated',
            name: 'vaultcreated',
            component: VaultCreation,
            meta: {
                breadcrumb: [
                    {name: 'GENERATING MNEUMONIC', link: 'createnewvault'},
                    {name: 'VALIDATING', link: 'validateVault'},
                    {name: 'FINISH'},
                ]
            }
        }
    ]
});
