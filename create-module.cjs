#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Utility function to prompt user
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Utility function to create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Utility function to create file with content
function createFile(filePath, content = '') {
  fs.writeFileSync(filePath, content);
  console.log(`Created file: ${filePath}`);
}

// Template contents
const templates = {
  index: `/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DataTable } from '@/components/data-table'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import {{PascalSubModuleName}}PrimaryButtons from './components/{{subModuleName}}-primary-buttons'
import {{{PascalSubModuleName}}Provider} from './context/{{subModuleName}}-context'
import { {{camelSubModuleName}} } from './data/{{subModuleName}}'

export default function {{PascalSubModuleName}}() {
  return (
    <{{PascalSubModuleName}}Provider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>All {{PascalSubModuleName}}</h2>
          </div>
          <{{PascalSubModuleName}}PrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable
            // @ts-ignore
            data={{{camelSubModuleName}}}
            // @ts-ignore
            columns={columns}
          />
        </div>
      </Main>
    </{{PascalSubModuleName}}Provider>
  )
}
`,

  primaryButtons: `import { Link } from '@tanstack/react-router'
import { IconDownload, IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

const {{PascalSubModuleName}}PrimaryButtons = () => {
  return (
    <div className='flex gap-2'>
      <Button variant='outline' className='space-x-1'>
        <span>Import</span> <IconDownload size={18} />
      </Button>
      <Link to='/'>
        <Button className='space-x-1'>
          <span>Create</span> <IconPlus size={18} />
        </Button>
      </Link>
    </div>
  )
}
export default {{PascalSubModuleName}}PrimaryButtons

`,

  columns: `import { ColumnDef } from '@tanstack/react-table';

// Define your data type
export interface {{PascalSubModuleName}}Data {
  id: string;
  // Add other fields here
}

export const columns: ColumnDef<{{PascalSubModuleName}}Data>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  // Add more columns here
];
`,

  context: `import React, { createContext, useContext, ReactNode } from 'react';

interface {{PascalSubModuleName}}ContextType {
  // Add your context properties here
}

const {{PascalSubModuleName}}Context = createContext<{{PascalSubModuleName}}ContextType | undefined>(undefined);

interface {{PascalSubModuleName}}ProviderProps {
  children: ReactNode;
}

export const {{PascalSubModuleName}}Provider: React.FC<{{PascalSubModuleName}}ProviderProps> = ({ children }) => {
  // Add your context logic here
  
  return (
    <{{PascalSubModuleName}}Context.Provider value={{}}>
      {children}
    </{{PascalSubModuleName}}Context.Provider>
  );
};

export const use{{PascalSubModuleName}} = () => {
  const context = useContext({{PascalSubModuleName}}Context);
  if (context === undefined) {
    throw new Error('use{{PascalSubModuleName}} must be used within a {{PascalSubModuleName}}Provider');
  }
  return context;
};
`,

  formContext: `import React, { createContext, useContext, ReactNode } from 'react';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';

interface {{PascalSubModuleName}}FormData {
  // Add your form fields here
}

interface {{PascalSubModuleName}}FormContextType {
  // Add additional form context properties here
}

const {{PascalSubModuleName}}FormContext = createContext<{{PascalSubModuleName}}FormContextType | undefined>(undefined);

interface {{PascalSubModuleName}}FormProviderProps {
  children: ReactNode;
}

export const {{PascalSubModuleName}}FormProvider: React.FC<{{PascalSubModuleName}}FormProviderProps> = ({ children }) => {
  const methods = useForm<{{PascalSubModuleName}}FormData>();
  
  // Add your form context logic here
  
  return (
    <FormProvider {...methods}>
      <{{PascalSubModuleName}}FormContext.Provider value={{}}>
        {children}
      </{{PascalSubModuleName}}FormContext.Provider>
    </FormProvider>
  );
};

export const use{{PascalSubModuleName}}Form = () => {
  const context = useContext({{PascalSubModuleName}}FormContext);
  if (context === undefined) {
    throw new Error('use{{PascalSubModuleName}}Form must be used within a {{PascalSubModuleName}}FormProvider');
  }
  return context;
};
`,

  data: ``,

  dataFile: `export const {{camelSubModuleName}} = []
`,

  schema: `import { z } from 'zod';

export const {{camelSubModuleName}}Schema = z.object({
  id: z.string().optional(),
  // Add your schema fields here
});

export type {{PascalSubModuleName}}Schema = z.infer<typeof {{camelSubModuleName}}Schema>;
`,

  form: `import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import FormTemplate, {
  ButtonContainer,
  FormWrapper,
  LeftSection,
  RightSection,
} from '@/components/form-template/form-template'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import {{{PascalSubModuleName}}}FormProvider from '../context/{{subModuleName}}-form-context'

const formSchema = z.object({})

type {{PascalSubModuleName}}Form = z.infer<typeof formSchema>

const {{PascalSubModuleName}}Form = () => {
  const form = useForm<{{PascalSubModuleName}}Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  const onSubmit = (data: {{PascalSubModuleName}}Form) => {
    // eslint-disable-next-line no-console
    console.log(data)
    form.reset()
  }

  return (
    <{{PascalSubModuleName}}FormProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-6 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>New {{PascalSubModuleName}}</h2>
          </div>
        </div>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='mb-15 flex-1 space-y-5'
          >
            <FormTemplate>
              <LeftSection>
                <FormWrapper>
                  placeholder
                </FormWrapper>
              </LeftSection>
              <RightSection>placeholder</RightSection>
            </FormTemplate>
          </form>
        </Form>
        <ButtonContainer>
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
          <Button variant='outline'>Close</Button>
        </ButtonContainer>
      </Main>
    </{{PascalSubModuleName}}FormProvider>
  )
}

export default {{PascalSubModuleName}}Form;
`,

  detail: `import React from 'react';

const {{PascalSubModuleName}}Detail: React.FC = () => {
  return (
    <div>
      <h1>{{PascalSubModuleName}} Detail</h1>
      {/* Add your detail view components here */}
    </div>
  );
};

export default {{PascalSubModuleName}}Detail;
`,

  detailContext: `import React, { createContext, useContext, ReactNode, useState } from 'react';

interface {{PascalSubModuleName}}DetailData {
  id: string;
  // Add your detail data fields here
}

interface {{PascalSubModuleName}}DetailContextType {
  detailData: {{PascalSubModuleName}}DetailData | null;
  loading: boolean;
  error: string | null;
  fetchDetail: (id: string) => Promise<void>;
  updateDetail: (data: Partial<{{PascalSubModuleName}}DetailData>) => void;
  clearDetail: () => void;
}

const {{PascalSubModuleName}}DetailContext = createContext<{{PascalSubModuleName}}DetailContextType | undefined>(undefined);

interface {{PascalSubModuleName}}DetailProviderProps {
  children: ReactNode;
}

export const {{PascalSubModuleName}}DetailProvider: React.FC<{{PascalSubModuleName}}DetailProviderProps> = ({ children }) => {
  const [detailData, setDetailData] = useState<{{PascalSubModuleName}}DetailData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      // Add your API call here
      // const data = await fetch{{PascalSubModuleName}}Detail(id);
      // setDetailData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const updateDetail = (data: Partial<{{PascalSubModuleName}}DetailData>) => {
    if (detailData) {
      setDetailData({ ...detailData, ...data });
    }
  };

  const clearDetail = () => {
    setDetailData(null);
    setError(null);
  };

  const value = {
    detailData,
    loading,
    error,
    fetchDetail,
    updateDetail,
    clearDetail,
  };

  return (
    <{{PascalSubModuleName}}DetailContext.Provider value={value}>
      {children}
    </{{PascalSubModuleName}}DetailContext.Provider>
  );
};

export const use{{PascalSubModuleName}}Detail = () => {
  const context = useContext({{PascalSubModuleName}}DetailContext);
  if (context === undefined) {
    throw new Error('use{{PascalSubModuleName}}Detail must be used within a {{PascalSubModuleName}}DetailProvider');
  }
  return context;
};
`
};

// Helper functions for string transformations
function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function toCamelCase(str) {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function replaceTemplateVariables(template, subModuleName) {
  const pascalSubModuleName = toPascalCase(subModuleName);
  const camelSubModuleName = toCamelCase(subModuleName);
  
  return template
    .replace(/\{\{subModuleName\}\}/g, subModuleName)
    .replace(/\{\{PascalSubModuleName\}\}/g, pascalSubModuleName)
    .replace(/\{\{camelSubModuleName\}\}/g, camelSubModuleName);
}

// Main function
async function createModule() {
  try {
    console.log('🚀 Module Generator\n');

    // Step 1: Get base folder
    const baseFolder = await prompt('Enter the base folder (e.g., src/feature): ');
    if (!baseFolder) {
      console.log('❌ Base folder is required');
      rl.close();
      return;
    }

    // Step 2: Get module name
    const moduleName = await prompt('Enter the module name (e.g., product): ');
    if (!moduleName) {
      console.log('❌ Module name is required');
      rl.close();
      return;
    }

    // Step 3: Check if module exists
    const moduleFolder = path.join(baseFolder, moduleName);
    const moduleExists = fs.existsSync(moduleFolder);

    let subModuleName;
    if (moduleExists) {
      console.log(`✅ Module '${moduleName}' exists in '${baseFolder}'`);
      // Step 4: Get sub-module name
      subModuleName = await prompt('Enter the sub-module name (e.g., all-products): ');
      if (!subModuleName) {
        console.log('❌ Sub-module name is required');
        rl.close();
        return;
      }
    } else {
      console.log(`📁 Module '${moduleName}' does not exist. It will be created.`);
      subModuleName = await prompt('Enter the sub-module name (e.g., all-products): ');
      if (!subModuleName) {
        console.log('❌ Sub-module name is required');
        rl.close();
        return;
      }
    }

    // Step 5: Ask for page/feature types
    console.log('\nAvailable page/feature types:');
    console.log('1. create');
    console.log('2. update');
    console.log('3. table');
    console.log('4. detail');
    
    const selectedFeatures = await prompt('Enter the features you want (comma-separated, e.g., create,table,detail): ');
    const features = selectedFeatures.split(',').map(f => f.trim().toLowerCase()).filter(f => ['create', 'update', 'table', 'detail'].includes(f));
    
    if (features.length === 0) {
      console.log('❌ At least one valid feature must be selected');
      rl.close();
      return;
    }

    console.log(`\n📋 Selected features: ${features.join(', ')}`);

    // Step 6 & 7: Create folder structure
    const subModuleFolder = path.join(moduleFolder, subModuleName);
    
    console.log(`\n🏗️  Creating module structure in: ${subModuleFolder}\n`);

    // Create main directories
    const directories = [
      subModuleFolder,
      path.join(subModuleFolder, 'components'),
      path.join(subModuleFolder, 'context'),
      path.join(subModuleFolder, 'data'),
      path.join(subModuleFolder, 'pages')
    ];

    directories.forEach(dir => ensureDirectoryExists(dir));

    // Create files
    const files = [
      // Main index file
      {
        path: path.join(subModuleFolder, 'index.tsx'),
        content: replaceTemplateVariables(templates.index, subModuleName)
      },
      // Components
      {
        path: path.join(subModuleFolder, 'components', `${subModuleName}-primary-buttons.tsx`),
        content: replaceTemplateVariables(templates.primaryButtons, subModuleName)
      },
      {
        path: path.join(subModuleFolder, 'components', 'columns.tsx'),
        content: replaceTemplateVariables(templates.columns, subModuleName)
      },
      // Context
      {
        path: path.join(subModuleFolder, 'context', `${subModuleName}-context.tsx`),
        content: replaceTemplateVariables(templates.context, subModuleName)
      },
      {
        path: path.join(subModuleFolder, 'context', `${subModuleName}-form-context.tsx`),
        content: replaceTemplateVariables(templates.formContext, subModuleName)
      },
      // Data
      {
        path: path.join(subModuleFolder, 'data', 'data.tsx'),
        content: replaceTemplateVariables(templates.data, subModuleName)
      },
      {
        path: path.join(subModuleFolder, 'data', `${subModuleName}.ts`),
        content: replaceTemplateVariables(templates.dataFile, subModuleName)
      },
      {
        path: path.join(subModuleFolder, 'data', 'schema.ts'),
        content: replaceTemplateVariables(templates.schema, subModuleName)
      },
      // Pages
      {
        path: path.join(subModuleFolder, 'pages', `${subModuleName}-form.tsx`),
        content: replaceTemplateVariables(templates.form, subModuleName)
      }
    ];

    // Add detail page and context if detail feature is selected
    if (features.includes('detail')) {
      files.push({
        path: path.join(subModuleFolder, 'pages', `${subModuleName}-detail.tsx`),
        content: replaceTemplateVariables(templates.detail, subModuleName)
      });
      files.push({
        path: path.join(subModuleFolder, 'context', `${subModuleName}-detail-context.tsx`),
        content: replaceTemplateVariables(templates.detailContext, subModuleName)
      });
    }

    // Create all files
    files.forEach(file => createFile(file.path, file.content));

    console.log(`\n✅ Module '${subModuleName}' created successfully!`);
    console.log(`📁 Location: ${subModuleFolder}`);
    console.log(`🎯 Features: ${features.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error creating module:', error.message);
  } finally {
    rl.close();
  }
}

// Run the script
createModule();