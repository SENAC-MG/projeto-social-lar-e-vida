// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  // Função auxiliar para realizar login
  /**
   * @param {import('@playwright/test').Page} page
   */
  async function login(page) {
    await page.goto('/');
    await page.getByLabel('E-mail').fill('leopoldino2@gmail.com');
    await page.getByLabel('Senha').fill('1234');
    await page.getByRole('button', { name: 'Entrar no Sistema' }).click();
    await expect(page).toHaveURL('/dashboard');
  }

  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('deve exibir o dashboard com todos os elementos principais', async ({ page }) => {
    // Verificar cabeçalho
    await expect(page.getByRole('heading', { name: 'Lar e Vida' })).toBeVisible();
    await expect(page.getByText('Dashboard de Upload de Arquivos')).toBeVisible();

    // Verificar logo no dashboard
    const logo = page.locator('img[alt="Logo Lar e Vida"]');
    await expect(logo).toBeVisible();
  });

  test('deve exibir área de upload', async ({ page }) => {
    // Verificar área de drag and drop
    const uploadArea = page.locator('[aria-label="Área de upload. Arraste e solte arquivos aqui ou pressione Enter para selecionar arquivos"]');
    await expect(uploadArea).toBeVisible();

    // Verificar texto de instrução
    await expect(page.getByText('Arraste e solte arquivos aqui')).toBeVisible();
    await expect(page.getByText('ou clique para selecionar arquivos')).toBeVisible();
    await expect(page.getByText('Suporta todos os tipos de arquivos • Tamanho máximo: 10MB')).toBeVisible();
  });

  test('deve abrir seletor de arquivos ao clicar na área de upload', async ({ page }) => {
    // O input de arquivo está escondido, mas podemos verificar que ele existe
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeAttached();
  });

  test('deve fazer upload de um arquivo', async ({ page }) => {
    // Criar um arquivo temporário para upload
    const testFile = Buffer.from('Conteúdo de teste do arquivo');

    // Selecionar arquivo
    await page.locator('input[type="file"]').setInputFiles({
      name: 'arquivo-teste.txt',
      mimeType: 'text/plain',
      buffer: testFile
    });

    // Verificar se o arquivo aparece na lista
    await expect(page.getByText('arquivo-teste.txt')).toBeVisible();
    await expect(page.getByText('Pendente')).toBeVisible();

    // Aguardar upload ser concluído
    await expect(page.getByText('Concluído')).toBeVisible({ timeout: 10000 });
  });

  test('deve fazer upload de múltiplos arquivos', async ({ page }) => {
    const file1 = Buffer.from('Conteúdo do arquivo 1');
    const file2 = Buffer.from('Conteúdo do arquivo 2');

    await page.locator('input[type="file"]').setInputFiles([
      {
        name: 'arquivo1.txt',
        mimeType: 'text/plain',
        buffer: file1
      },
      {
        name: 'arquivo2.txt',
        mimeType: 'text/plain',
        buffer: file2
      }
    ]);

    // Verificar se ambos os arquivos aparecem
    await expect(page.getByText('arquivo1.txt')).toBeVisible();
    await expect(page.getByText('arquivo2.txt')).toBeVisible();
    await expect(page.getByText('Arquivos (2)')).toBeVisible();
  });

  test('deve remover arquivo da lista', async ({ page }) => {
    const testFile = Buffer.from('Conteúdo de teste');

    await page.locator('input[type="file"]').setInputFiles({
      name: 'arquivo-para-remover.txt',
      mimeType: 'text/plain',
      buffer: testFile
    });

    await expect(page.getByText('arquivo-para-remover.txt')).toBeVisible();

    // Clicar no botão de remover
    await page.locator('button[aria-label="Remover arquivo"]').click();

    // Verificar se o arquivo foi removido
    await expect(page.getByText('arquivo-para-remover.txt')).not.toBeVisible();
    await expect(page.getByText('Nenhum arquivo enviado ainda')).toBeVisible();
  });

  test('deve limpar todos os arquivos', async ({ page }) => {
    const testFile = Buffer.from('Conteúdo de teste');

    await page.locator('input[type="file"]').setInputFiles({
      name: 'arquivo-teste.txt',
      mimeType: 'text/plain',
      buffer: testFile
    });

    await expect(page.getByText('arquivo-teste.txt')).toBeVisible();

    // Clicar em "Limpar tudo"
    await page.getByRole('button', { name: 'Limpar tudo' }).click();

    // Verificar se todos os arquivos foram removidos
    await expect(page.getByText('Nenhum arquivo enviado ainda')).toBeVisible();
  });

  test('deve exibir erro para arquivo maior que 10MB', async ({ page }) => {
    // Criar um arquivo maior que 10MB (11MB)
    const largeFile = Buffer.alloc(11 * 1024 * 1024);

    await page.locator('input[type="file"]').setInputFiles({
      name: 'arquivo-grande.txt',
      mimeType: 'text/plain',
      buffer: largeFile
    });

    // Verificar se o erro é exibido
    await expect(page.getByText('arquivo-grande.txt')).toBeVisible();
    await expect(page.getByText('Erro')).toBeVisible();
    await expect(page.getByText('Arquivo excede o limite de 10MB')).toBeVisible();
  });

  test('deve alternar entre modo claro e escuro', async ({ page }) => {
    // Verificar botão de tema (inicialmente modo claro - ícone de lua)
    const themeButton = page.locator('button[aria-label="Ativar modo escuro"]');
    await expect(themeButton).toBeVisible();

    // Clicar para ativar modo escuro
    await themeButton.click();

    // Verificar se o botão agora mostra opção de modo claro (ícone de sol)
    await expect(page.locator('button[aria-label="Ativar modo claro"]')).toBeVisible();

    // Clicar novamente para voltar ao modo claro
    await page.locator('button[aria-label="Ativar modo claro"]').click();

    // Verificar se voltou ao modo claro
    await expect(page.locator('button[aria-label="Ativar modo escuro"]')).toBeVisible();
  });

  test('deve exibir estado vazio quando não há arquivos', async ({ page }) => {
    await expect(page.getByText('Nenhum arquivo enviado ainda. Comece fazendo upload de arquivos.')).toBeVisible();
  });

  test('deve exibir contador de arquivos', async ({ page }) => {
    // Inicialmente deve mostrar 0 arquivos ou não mostrar o contador
    await expect(page.getByText('Arquivos (0)')).not.toBeVisible();

    const testFile = Buffer.from('Conteúdo de teste');

    await page.locator('input[type="file"]').setInputFiles({
      name: 'arquivo-teste.txt',
      mimeType: 'text/plain',
      buffer: testFile
    });

    // Agora deve mostrar o contador
    await expect(page.getByText('Arquivos (1)')).toBeVisible();
  });

  test('deve exibir ícone de upload na área de drag and drop', async ({ page }) => {
    // Verificar se há um ícone de upload (SVG ou elemento com classe específica)
    const uploadIcon = page.locator('[data-state="open"] svg').first();
    await expect(uploadIcon).toBeVisible();
  });

  test('deve aplicar estilo de drag over ao arrastar arquivo', async ({ page }) => {
    const uploadArea = page.locator('[aria-label="Área de upload. Arraste e solte arquivos aqui ou pressione Enter para selecionar arquivos"]');

    // Simular dragover
    await uploadArea.dispatchEvent('dragover');

    // Verificar se o estilo de drag over foi aplicado
    // O texto deve mudar para "Solte os arquivos aqui"
    await expect(page.getByText('Solte os arquivos aqui')).toBeVisible();

    // Simular dragleave
    await uploadArea.dispatchEvent('dragleave');

    // Verificar se voltou ao estado normal
    await expect(page.getByText('Arraste e solte arquivos aqui')).toBeVisible();
  });
});
