import puppeteer from "puppeteer";

export class AutorizadorAutomatico {
    async authorizeAutomatically(): Promise<void> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
     

        try {
            // Espera até que o elemento "Continuar" esteja disponível e, em seguida, clica nele
            await Promise.all([
                page.waitForSelector('//button[contains(text(), "Continuar")]') // Botão "Continuar"
            ]).then(async () => {
                await Promise.all([
                    page.click('//button[contains(text(), "Continuar")]'), // Clica no botão "Continuar"
                    page.waitForNavigation() // Espera a navegação após clicar em "Continuar"
                ]);
            });

            console.log('Autorização automatizada concluída com sucesso.');
        } catch (error) {
            console.error('Erro durante a autorização automatizada:', error);
        } finally {
            await browser.close(); // Fecha o navegador após a conclusão, mesmo em caso de erro
        }
    }
}