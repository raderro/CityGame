export const events = [
    {
        id: 1,
        title: "Ustawa o dotacjach ekologicznych",
        description: "Rząd proponuje dofinansowanie budowy elektrowni słonecznych. Podpisanie ustawy zwiększy satysfakcję mieszkańców i przyniesie fundusze z Unii Eurokołchozowej. Brak decyzji może spotkać się z niezadowoleniem ekologów.",
        onAccept: { money: 1000, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 2,
        title: "Nowy podatek lokalny",
        description: "Możesz wprowadzić podatek od nieruchomości. Zwiększy to budżet miasta, ale może wywołać niezadowolenie mieszkańców. Odmowa ucieszy mieszkańców, ale nie przyniesie dodatkowych środków.",
        onAccept: { money: 500, satisfaction: -10 },
        onReject: { satisfaction: 5 }
    },
    {
        id: 3,
        title: "Protest mieszkańców",
        description: "Mieszkańcy protestują przeciwko planowanej budowie nowej drogi przez park. Podpisanie decyzji mimo protestów pogorszy nastroje i uszczupli budżet. Odmowa zyska poparcie społeczne.",
        onAccept: { satisfaction: -15, money: -1000 },
        onReject: { satisfaction: 5 }
    },
    {
        id: 4,
        title: "Inwestycja w transport publiczny",
        description: "Masz szansę zwiększyć inwestycje w transport publiczny. To kosztowna decyzja, ale poprawi satysfakcję mieszkańców. Brak inwestycji może być odebrany negatywnie.",
        onAccept: { money: -2000, satisfaction: 10 },
        onReject: { satisfaction: -10 }
    },
    {
        id: 5,
        title: "Nowe przepisy dotyczące ochrony środowiska",
        description: "Wprowadzenie nowych przepisów środowiskowych może poprawić wizerunek władz, ale wiąże się z kosztami. Odmowa może spotkać się z krytyką aktywistów.",
        onAccept: { money: -1000, satisfaction: 5 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 6,
        title: "Zwiększenie wydatków na zdrowie",
        description: "Propozycja zwiększenia wydatków na służbę zdrowia. Wpłynie to pozytywnie na zadowolenie mieszkańców, ale będzie dużym obciążeniem dla budżetu. Odmowa może zostać źle odebrana.",
        onAccept: { money: -3000, satisfaction: 15 },
        onReject: { satisfaction: -10 }
    },
    {
        id: 7,
        title: "Zwiększenie podatków",
        description: "Możesz zatwierdzić wzrost podatków dla najbogatszych. To poprawi stan finansów, ale zmniejszy ogólne zadowolenie. Brak decyzji może przynieść ulgę mieszkańcom.",
        onAccept: { money: 2000, satisfaction: -20 },
        onReject: { satisfaction: 10 }
    },
    {
        id: 8,
        title: "Nowe przepisy dotyczące budownictwa",
        description: "Masz możliwość wprowadzenia nowych przepisów budowlanych, które poprawią standardy życia. Będzie to kosztowne, ale poprawi nastroje mieszkańców. Odmowa może spotkać się z krytyką urbanistów.",
        onAccept: { money: -1500, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 9,
        title: "Inwestycja w edukację",
        description: "Rząd proponuje zwiększenie inwestycji w edukację. To spory koszt, ale może zwiększyć poparcie społeczne. Brak decyzji pogorszy nastroje wśród rodzin i nauczycieli.",
        onAccept: { money: -3000, satisfaction: 10 },
        onReject: { satisfaction: -15 }
    },
    {
        id: 10,
        title: "Nowe przepisy dotyczące transportu",
        description: "Możesz zatwierdzić reformę transportu miejskiego. Kosztowna decyzja, ale znacznie zwiększy satysfakcję mieszkańców. Odmowa może zostać odebrana jako brak troski o wygodę obywateli.",
        onAccept: { money: -2000, satisfaction: 20 },
        onReject: { satisfaction: -10 }
    },
    {
        id: 11,
        title: "Inwestycja w infrastrukturę",
        description: "Propozycja zwiększenia wydatków na infrastrukturę. To kosztowna decyzja, ale poprawi jakość życia mieszkańców. Brak decyzji może spotkać się z krytyką.",
        onAccept: { money: -4000, satisfaction: 15 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 12,
        title: "Nowe przepisy dotyczące ochrony zwierząt",
        description: "Wprowadzenie nowych przepisów dotyczących ochrony zwierząt. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką ekologów.",
        onAccept: { money: -1000, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 13,
        title: "Inwestycja w kulturę",
        description: "Propozycja zwiększenia wydatków na kulturę. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką artystów.",
        onAccept: { money: -2000, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 14,
        title: "Nowe przepisy dotyczące ochrony danych osobowych",
        description: "Wprowadzenie nowych przepisów dotyczących ochrony danych osobowych. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką aktywistów.",
        onAccept: { money: -1500, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 15,
        title: "Inwestycja w sport",
        description: "Propozycja zwiększenia wydatków na sport. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką sportowców.",
        onAccept: { money: -2000, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 16,
        title: "Nowe przepisy dotyczące zdrowia psychicznego",
        description: "Wprowadzenie nowych przepisów dotyczących ochrony zdrowia psychicznego. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką aktywistów.",
        onAccept: { money: -1500, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 17,
        title: "Inwestycja w technologie",
        description: "Propozycja zwiększenia wydatków na nowe technologie. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką technologów.",
        onAccept: { money: -2000, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 18,
        title: "Nowe przepisy dotyczące ochrony klimatu",
        description: "Wprowadzenie nowych przepisów dotyczących ochrony klimatu. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką ekologów.",
        onAccept: { money: -1500, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 19,
        title: "Inwestycja w transport ekologiczny",
        description: "Propozycja zwiększenia wydatków na transport ekologiczny. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką ekologów.",
        onAccept: { money: -2000, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 20,
        title: "Nowe przepisy dotyczące zdrowia publicznego",
        description: "Wprowadzenie nowych przepisów dotyczących ochrony zdrowia publicznego. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką aktywistów.",
        onAccept: { money: -1500, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 21,
        title: "Inwestycja w bezpieczeństwo",
        description: "Propozycja zwiększenia wydatków na bezpieczeństwo. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką aktywistów.",
        onAccept: { money: -2000, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    },
    {
        id: 22,
        title: "Nowe przepisy dotyczące praw człowieka",
        description: "Wprowadzenie nowych przepisów dotyczących ochrony praw człowieka. To kosztowna decyzja, ale poprawi wizerunek miasta. Brak decyzji może spotkać się z krytyką aktywistów.",
        onAccept: { money: -1500, satisfaction: 10 },
        onReject: { satisfaction: -5 }
    }
];
