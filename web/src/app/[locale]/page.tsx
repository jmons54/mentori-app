import { i18nServer } from '@/services/i18n-server';
import { Layout } from '@/components/layout';

export async function Index() {
  const { t } = await i18nServer();
  return (
    <Layout>
      <div
        className={
          'bg-slate-800 text-white dark:bg-slate-900 min-h-[700px] max-h-[75vh] flex flex-col items-center justify-center'
        }
      >
        <h1 className={'text-5xl max-w-[680px] text-center'}>
          {t('page:home.title')}
        </h1>
        <button className="mt-16 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="text-xl relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            {t('page:home.tryDemo')}
          </span>
        </button>
      </div>
    </Layout>
  );
}

export default Index;
