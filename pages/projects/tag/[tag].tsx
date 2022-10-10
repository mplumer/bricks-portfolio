import classNames from 'classnames';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { fetchPages, fetchTags, types } from 'react-bricks/frontend';
import ProjectListItem from '../../../components/ProjectListItem';
import ErrorNoPage from '../../../components/errorNoPage';
import Layout from '../../../components/layout';
import config from '../../../react-bricks/config';

interface PageProps {
  pagesByTag: types.Page[];
  popularProjects: types.Page[];
  error: string;
  filterTag: string;
  allTags: string[];
}

const Page: React.FC<PageProps> = ({
  filterTag,
  pagesByTag,
  popularProjects,
  allTags,
  error,
}) => {
  return (
    <Layout>
      <Head>
        <title>{filterTag}</title>
        <meta name="description" content={filterTag} />
      </Head>
      <h1 className="pb-4 mt-10 mb-4 text-4xl font-black leading-none tracking-tight text-center text-gray-900 sm:text-6xl lg:text-7xl sm:mt-12">
        Projects
      </h1>
      <div className="flex max-w-6xl px-8 py-16 mx-auto space-x-24">
        <section className="flex-[2] space-y-8">
          <h2 className="mb-8 font-bold tracking-widest text-pink-500 uppercase">
            {filterTag}
          </h2>
          {pagesByTag?.map((project) => (
            <ProjectListItem
              key={project.id}
              title={project.name}
              href={project.slug}
              content={project.meta.description}
            />
          ))}
        </section>
        <section className="flex-1 space-y-16">
          <div>
            <h2 className="mb-8 font-bold tracking-widest text-pink-500 uppercase">
              Tags
            </h2>
            <div className="flex flex-wrap items-center">
              {/* T A G  */}
              {allTags
                ?.filter((tag) => tag !== 'popular')
                .map((tag) => (
                  <Link
                    href={
                      tag === filterTag ? '/projects' : `/projects/tag/${tag}`
                    }
                    key={tag}
                  >
                    <a
                      className={classNames(
                        'inline-block text-sm font-bold mr-2 mb-2 transform duration-200  rounded-md px-2 py-1',
                        tag === filterTag
                          ? 'text-blue-800 bg-blue-100 hover:bg-blue-200 hover:text-blue-900'
                          : 'text-cyan-800 bg-cyan-100 hover:bg-cyan-200 hover:text-cyan-900'
                      )}
                    >
                      <div className="" style={{ zIndex: -1 }} />
                      {tag}
                    </a>
                  </Link>
                ))}
              {/*  */}
            </div>
          </div>
          <div>
            <h2 className="mb-8 font-bold tracking-widest text-pink-500 uppercase">
              Most Popular
            </h2>
            <ul>
              {popularProjects?.map((project) => (
                <li key={project.id}>
                  <Link href={`/projects/projects/${project.slug}`}>
                    <a className="text-lg font-bold leading-10 text-gray-900 transition-colors hover:text-cyan-600">
                      {project.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      {error === 'NOKEYS' && <ErrorNoPage />}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!config.apiKey) {
    return { props: { error: 'NOKEYS' } };
  }
  const { tag } = context.params;
  try {
    const { items: tags } = await fetchTags(process.env.API_KEY);
    tags.sort();

    const pagesByTag = await fetchPages(config.apiKey, {
      tag: tag.toString(),
      type: 'projects',
      pageSize: 1000,
      sort: '-publishedAt',
    });
    const popularProjects = await fetchPages(config.apiKey, {
      type: 'projects',
      tag: 'popular',
      sort: '-publishedAt',
    });
    return {
      props: { pagesByTag, filterTag: tag, popularProjects, allTags: tags },
    };
  } catch {
    return { props: {} };
  }
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  if (!config.apiKey) {
    return { paths: [], fallback: false };
  }

  const { items: tags } = await fetchTags(process.env.API_KEY);

  const paths = tags.map((tag) => `/projects/tag/${tag}`);

  return { paths, fallback: false };
};

export default Page;
