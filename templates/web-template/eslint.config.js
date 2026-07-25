import prettier from 'eslint-config-prettier';
import path from 'node:path';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';
import playwright from 'eslint-plugin-playwright';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	},
	{
		files: ['src/**/*.ts'],
		languageOptions: { parserOptions: { projectService: true } },
		rules: {
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-misused-promises': 'error',
			'@typescript-eslint/no-deprecated': 'error'
		}
	},
	{
		rules: {
			'@typescript-eslint/no-non-null-assertion': 'error',
			'no-restricted-syntax': [
				'error',
				{
					selector: 'TSAsExpression > TSAsExpression.expression',
					message: 'double assertion hides a real type error, fix the type'
				}
			],
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{ name: 'moment', message: 'legacy, use date-fns or the platform' },
						{ name: 'request', message: 'deprecated since 2020, use fetch' },
						{ name: 'node-fetch', message: 'node has fetch' },
						{
							name: 'dotenv',
							message: 'vite loads env files itself, see loadEnv for the config file'
						}
					]
				}
			]
		}
	},
	{
		files: ['src/**/*.{test,spec}.{js,ts}'],
		plugins: { vitest },
		rules: {
			...vitest.configs.recommended.rules,
			'vitest/no-focused-tests': 'error',
			'vitest/no-conditional-in-test': 'error',
			'vitest/max-nested-describe': ['error', { max: 2 }],
			'vitest/no-restricted-matchers': [
				'error',
				{
					toBeTruthy: 'assert the actual value',
					toBeDefined: 'assert the actual value'
				}
			]
		}
	},
	{
		files: ['e2e/**/*.e2e.{js,ts}'],
		plugins: { playwright },
		rules: {
			...playwright.configs['flat/recommended'].rules,
			'playwright/no-focused-test': 'error',
			'playwright/no-wait-for-timeout': 'error',
			'playwright/no-networkidle': 'error'
		}
	}
);
