import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { fetchPages, fetchTags, types } from 'react-bricks/frontend';
import ProjectListItem from '../../components/ProjectListItem';
import ErrorNoKeys from '../../components/errorNoKeys';
import Layout from '../../components/layout';
import config from '../../react-bricks/config';

interface HomeProps {
  error: string;
  tags: string[];
  projects: types.Page[];
}

const ProjectsList: React.FC<HomeProps> = ({ tags, projects, error }) => {
  return (
    <Layout>
      <Head>
        <title>Project List</title>
        <meta name="description" content="React Bricks projects starter" />
      </Head>

      <h1 className="pb-4 mt-10 mb-4 text-4xl font-black leading-none tracking-tight text-center text-gray-900 sm:text-6xl lg:text-7xl sm:mt-12">
        Projects
      </h1>
      <div className="flex max-w-6xl px-8 py-16 mx-auto space-x-24">
        <section className="flex-[2] space-y-8">
          <h2 className="mb-8 font-bold tracking-widest text-pink-500 uppercase">
            Recently published
          </h2>
          {projects?.map((project) => (
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
              {tags
                ?.filter((tag) => tag !== 'popular')
                .map((tag) => (
                  <Link href={`/projects/tag/${tag}`} key={tag}>
                    <a className="inline-block px-2 py-1 mb-2 mr-2 text-sm font-bold duration-200 transform rounded-md text-cyan-800 bg-cyan-100 hover:bg-cyan-200 hover:text-cyan-900">
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
              {projects
                ?.filter((project) =>
                  project.tags.find((tag) => tag === 'popular')
                )
                .map((project) => (
                  <li key={project.id}>
                    <Link href={`/projects/project/${project.slug}`}>
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
      {error === 'NOKEYS' && <ErrorNoKeys />}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (!config.apiKey) {
    return { props: { error: 'NOKEYS' } };
  }
  try {
    const { items: tags } = await fetchTags(process.env.API_KEY);
    tags.sort();

    const projects = await fetchPages(process.env.API_KEY, {
      type: 'projects',
      pageSize: 1000,
      sort: '-publishedAt',
    });

    return { props: { projects, tags } };
  } catch {
    return { props: {} };
  }
};

export default ProjectsList;
