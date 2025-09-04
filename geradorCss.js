(() => {

    //anotar umas coisas aqui senão esqueço e me perco:
    //1. o botão de copiar não funciona se o textarea estiver vazio (meio obvío, mas enfim)


    const CLASS_NAME = 'div-estilizada';

    //valores padrão que coloquei já que não foram especificados, caracteriza largura da borda e raio de arredondamento
    
    const DEFAULTS = {

        borderWidth: 2,
        radius: 12

    };

    //isso daqui serve para (literalmente) buscar os elementos no html por um atalho

    const $ = (sel, root = document) => root.querySelector(sel);

    //código espera o carregamento para então rodar, meio obvío de certa forma também

    document.addEventListener('DOMContentLoaded', () => {

        //vai pegar os elementos necessários do html, usando novamente o a const $

        const form = $('.painel');
        const btn = $('.btn');
        const output = $('.saida');
        const direita = $('.direita');

        //aqui é criado o botão de copiar o CSS e a mensagem de status
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copiar CSS';
        copyBtn.type = 'button'; //é pra não enviar o formulário
        copyBtn.className = 'btn'; //reaproveita a classe
        copyBtn.style.marginTop = '10px';

        const statusMsg = document.createElement('div'); //cria  a div para a mensagem do status
        statusMsg.style.marginTop = '8px';
        statusMsg.style.fontSize = '14px';
        statusMsg.style.color = '#22c55e'; // verde quase neon
        statusMsg.style.display = 'none'; //isso aqui faz ela começar escondida!

        //esse 'afterend' serve para colocar o botão e a mensagem embaixo do textarea
        output.insertAdjacentElement('afterend', copyBtn);
        copyBtn.insertAdjacentElement('afterend', statusMsg);

        //bem simples, acho que não vou esquecer: quando clicado no botão, gera o css pegando os valores informados pelo usuário no formulário!
        //parseInt é para garantir que o valor seja um número inteiro, o 10 é tipo uma base (decimal)

        btn.addEventListener('click', () => {

            const cor = $('#cor').value;
            const estilo = $('#estilo').value;
            const cantos = form.querySelector('input[name="cantos"]:checked')?.value || 'retos';
            const largura = parseInt($('#largura').value, 10);
            const altura  = parseInt($('#altura').value, 10);

            //parte mais complicada. as regras (em um array, lista) servem para relembrar os valores padroes que atribuí lá em cima, dependendo da escolha do usuário


            const rules = [
            `border: ${DEFAULTS.borderWidth}px ${estilo} ${cor};`,
            `border-radius: ${cantos === 'arredondadas' ? DEFAULTS.radius : 0}px;`
            ];

            //os comentários servem para caso o usuário não informe um valor válido. os valores só entram se forem números válidos

            const comments = [];
            if (Number.isFinite(largura) && largura >= 0) {

                rules.push(`width: ${largura}px;`);

            } else {

                comments.push('/* width: 300px; - opcional */');

            }

            if (Number.isFinite(altura) && altura >= 0) {

                rules.push(`height: ${altura}px;`);

            } else {

                comments.push('/* height: 200px; - opcional */');

            }

            //reúne tudo em uma string final de css. usa o join para juntar os elementos (lembrei de sql)

            const classSelector = `.${CLASS_NAME}`;
            const css = `/* aplique a classe "${CLASS_NAME}" na sua <div> */\n` +
                    `${classSelector} {\n  ${rules.join('\n  ')}\n}\n` +
                    (comments.length ? comments.join('\n') + '\n' : '');


            //vai jogar tudo isso lá na saída de texto (textarea) onde o codigo css aparece
            output.value = css;

        });

        //botaozinho para facilitar a vida do usuario. serve para copiar o css gerado para a área de transferência. não foi muito complicado, acho que não vou esquecer
        //como eu disse lá em cima, não funciona se o textarea estiver vazio
        copyBtn.addEventListener('click', () => {

            if (!output.value.trim()) return;

            //isso seleciona tudo (select) e executa o comando de copiar (execCommand)

            output.select();
            document.execCommand('copy');

            //mostra mensagem de sucesso! coisa simples
            statusMsg.textContent = 'CSS copiado com sucesso!';
            statusMsg.style.display = 'block';

            //simples, mas depois de 2 segundos a mensagem some sozinha
            setTimeout(() => {
            statusMsg.style.display = 'none';
            }, 2000);

        });

    });

})();