import { environment } from "src/environments/environment";

const isInRange = (expiryDate, startDate, endDate) => {
    return new Date(startDate) < new Date(expiryDate) && new Date(expiryDate) < new Date(endDate);
}

export const resolveCardId = (circuit: string, productCode: string): string => {
    if( circuit?.toUpperCase() == 'MAESTRO') circuit = 'MASTERCARD';
    return `${productCode}::${circuit}`;
}

export const resolveCardArt = (circuit, productCode, { expiryDate = '', abi = '' } = {}): string => {
    const cardId = resolveCardId(circuit, productCode);
    const extras = { expiryDate: expiryDate, abi: abi };

    return CardArtsMap[cardId] ? CardArtsMap[cardId](extras) :
        (circuit && !!CardArtsMap[`EMPTY::${circuit}`] ? CardArtsMap[`EMPTY::${circuit}`]() : CardArtsMap[`EMPTY::GENERIC`]())
}

export const CardArtsMap = {
    "EMPTY::GENERIC": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "",
            circuit: "",
            url: "assets/card-arts/EMPTY-Generic.png"
        };
        return cardArt;
    },
    "EMPTY::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "",
            circuit: "VISA",
            url: "assets/card-arts/EMPTY-Visa.png"
        };
        return cardArt;
    },
    "EMPTY::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "",
            circuit: "MASTERCARD",
            url: "assets/card-arts/EMPTY-Mastercard.png"
        };
        return cardArt;
    },
    "BPEUR611::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR611",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "BPEUD811::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUD811",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMAEB00000000B0000000001052021.png"
        }

        if (expiryDate && isInRange(expiryDate, "2026-12-01", "2099-12-31")) {
            cardArt.url = "assets/card-arts/MMAEB00000000B0000000001011970.png";
        }

        return cardArt;
    },
    "BPEUN511::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUN511",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "BPEUX811::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUX811",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMAEB00000000B0000000001052021.png"
        }

        if (expiryDate && isInRange(expiryDate, "2026-12-01", "2099-12-31")) {
            cardArt.url = "assets/card-arts/MMAEB00000000B0000000001011970.png";
        }

        return cardArt;
    },
    "BPEUR621::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR621",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "PRIMC039::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC039",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR1300000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIWS70::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIWS70",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0400000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR511::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR511",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000B0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "2026-12-01", "2099-12-31")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "CSC00537::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00537",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCN39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCN39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR1300000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR201::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR201",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "BPEUR811::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR811",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMAEB00000000B0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/MMAEB00000000B0000000001052021.png";
        }

        return cardArt;
    },
    "CSC99715::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC99715",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUI811::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUI811",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMAEB00000000B0000000001052021.png"
        }

        if (expiryDate && isInRange(expiryDate, "2026-12-01", "2099-12-31")) {
            cardArt.url = "assets/card-arts/MMAEB00000000B0000000001011970.png";
        }

        return cardArt;
    },
    "PRIIUS70::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIUS70",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0400000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00500::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00500",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR211::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR211",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "PRIIW070::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIW070",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0400000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00108::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00108",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00114::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00114",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00114::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00114",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIWU70::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIWU70",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0400000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCP56::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCP56",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0500000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00538::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00538",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00534::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00534",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUS611::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUS611",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "CSC02100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00200",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00600::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00600",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC02800::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02800",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCN24::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCN24",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR1300000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00107::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00107",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00364::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00364",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00106::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00106",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00106::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00106",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPIDM081::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPIDM081",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MBA0538700140.png"
        };
        return cardArt;
    },
    "CSC02600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIUN70::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIUN70",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0400000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00101::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00101",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00101::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00101",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00104::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00104",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00104::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00104",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMC024::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC024",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR1300000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIISP70::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIISP70",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0400000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR202::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR202",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "PRIMCN40::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCN40",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR1300000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00102::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00102",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00102::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00102",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCD39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCD39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSC00700::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00700",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIWN70::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIWN70",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0400000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCP80::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCP80",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0500000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC90100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC90100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSD00200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD00200",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSD00200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD00200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUS511::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUS511",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "ASC00598::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00598",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00598::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00598",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02000::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02000",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02000::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02000",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02900::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02900",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02900::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02900",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00849::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00849",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00849::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00849",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "BPIDV081::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPIDV081",
            circuit: "VISA",
            url: "assets/card-arts/VBA0538700130.png"
        };
        return cardArt;
    },
    "CSC00535::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00535",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00637::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00637",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCP79::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCP79",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0500000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00861::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00861",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIUU66::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIUU66",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0600000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCN60::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCN60",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR1300000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00600::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00600",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00100",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR212::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR212",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "PRIIUN66::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIUN66",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR0300000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMC060::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC060",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR1300000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00299::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00299",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00299::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00299",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00853::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00853",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCN44::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCN44",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR2200000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC04300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC04300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECFC00000000D0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00850::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00850",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00850::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00850",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMNL40::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMNL40",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSC02200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUX621::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUX621",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000B0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "2026-12-01", "2099-12-31")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "CSC00900::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00900",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00900::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00900",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00588::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00588",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIUN53::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIUN53",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSC99698::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC99698",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00300",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC05800::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC05800",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC05800::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC05800",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSD90300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD90300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSD00300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD00300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIRN38::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIRN38",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "ASC00596::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00596",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00596::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00596",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00788::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00788",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMNP40::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMNP40",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSC90715::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC90715",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00800::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00800",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00800::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00800",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC99864::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC99864",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC90698::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC90698",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01600::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01600",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00100",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00288::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00288",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00200",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUS811::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUS811",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMAEB00000000B0000000001052021.png"
        }

        if (expiryDate && isInRange(expiryDate, "2026-12-01", "2099-12-31")) {
            cardArt.url = "assets/card-arts/MMAEB00000000B0000000001011970.png";
        }

        return cardArt;
    },
    "CSC03000::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC03000",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC90637::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC90637",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRD00700::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD00700",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD00700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD00700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00105::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00105",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00105::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00105",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR555::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR555",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2027-01-31")) {
            cardArt.url = "assets/card-arts/VDBCR00100000A0000000001011970.png";
        }

        return cardArt;
    },
    "CRD00400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD00400",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD00400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD00400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC03100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC03100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02900::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02900",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC04599::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC04599",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC04599::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC04599",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIICS63::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIICS63",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "GSC00700::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00700",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSD00288::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD00288",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC05400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC05400",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC05400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC05400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC06300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC06300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSD90288::visa": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD90288",
            circuit: "visa",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00862::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00862",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIUU38::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIUU38",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSC00799::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00799",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00799::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00799",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC02900::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02900",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIBM38::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIBM38",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "ASC00597::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00597",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00597::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00597",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC02400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00698::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00698",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUS621::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUS621",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "ASC00100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00100",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00062::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00062",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC03200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC03200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUX615::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUX615",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMAEB00000000B0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/MMAEB00000000B0000000001052021.png";
        }

        return cardArt;
    },
    "CSC01300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00599::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00599",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00599::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00599",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC04100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC04100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIBM63::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIBM63",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "GSC00543::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00543",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00365::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00365",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECFC00000000D0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00688::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00688",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00715::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00715",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00900::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00900",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00900::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00900",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00400",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSCV0861::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSCV0861",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR625::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR625",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "CSC00578::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00578",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00063::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00063",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00400",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00552::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00552",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00552::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00552",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSD00299::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD00299",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSD00299::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD00299",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00600::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00600",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC04500::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC04500",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC04500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC04500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00500::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00500",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC90578::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC90578",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIBP63::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIBP63",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "GSC02500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00199::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00199",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00199::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00199",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00547::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00547",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00547::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00547",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00300",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUD615::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUD615",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMAEB00000000B0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/MMAEB00000000B0000000001052021.png";
        }

        return cardArt;
    },
    "PRIMCJ39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCJ39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSD90851::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD90851",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00536::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00536",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIUN38::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIUN38",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CRC02010::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02010",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02010::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02010",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00570::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00570",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC02700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00539::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00539",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00699::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00699",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00699::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00699",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PKCP2503::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCP2503",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKCP2503::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCP2503",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIF062::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIF062",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "PKCPPP03::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCPPP03",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCN43::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCN43",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCA39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCA39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "GSC00588::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00588",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PKCM2502::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCM2502",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKCM2502::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCM2502",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCE39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCE39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CRC03700::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03700",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00549::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00549",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00549::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00549",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00548::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00548",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00548::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00548",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC04100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC04100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCS44::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCS44",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MMCUNR2200000A0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00299::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00299",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00299::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00299",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00551::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00551",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00551::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00551",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00317::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00317",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRS00100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRS00100",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRS00100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRS00100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMC064::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC064",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "GSC00540::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00540",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "BWS00128::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BWS00128",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEWBR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00854::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00854",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD00200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD00200",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD00200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD00200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00300",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00399::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00399",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00399::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00399",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUN555::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUN555",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2027-01-31")) {
            cardArt.url = "assets/card-arts/VDBCR00100000A0000000001011970.png";
        }

        return cardArt;
    },
    "GSC00400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00400",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC02288::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02288",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIZ062::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIZ062",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSC00899::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00899",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00899::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00899",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC02000::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02000",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC02000::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02000",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIF262::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIF262",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "BSI00488::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00488",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00488::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00488",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKCMPP02::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCMPP02",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },

    "CSC01600::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01600",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00688::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00688",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSD00300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSD00300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC02500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMRF40::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMRF40",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "BSI00400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00400",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC99500::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC99500",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC99500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC99500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRD00900::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD00900",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD00900::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD00900",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR615::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR615",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "GSC00788::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00788",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03000::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03000",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03000::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03000",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSD00400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD00400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECFC00000000D0000000001011970.png"
        };
        return cardArt;
    },
    "PKCCPP04::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCCPP04",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01800::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01800",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01800::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01800",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKCC2504::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCC2504",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKCC2504::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCC2504",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIZ262::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIZ262",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCX40::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCX40",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "PRIMC082::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC082",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5256210000000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR203::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR203",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "PRIMRT40::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMRT40",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCG39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCG39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "GSC03000::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC03000",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSD00100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSD00100",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSD00100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSD00100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01610::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01610",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01610::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01610",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01100",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00188::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00188",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00188::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00188",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00499::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00499",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00499::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00499",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00797::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00797",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00110::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00110",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKCP2593::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCP2593",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKCP2593::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCP2593",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC02300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCI39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCI39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "BSI00499::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00499",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00499::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00499",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSCV0862::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSCV0862",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00300",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00546::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00546",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00546::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00546",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSCV9864::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSCV9864",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00541::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00541",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00800::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00800",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSD90852::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD90852",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSD00069::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD00069",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00446::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00446",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00109::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00109",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00550::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00550",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00550::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00550",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC03799::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC03799",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC04000::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC04000",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01200",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIF362::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIF362",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSC03700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC03700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PKRB2501::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRB2501",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKRB2501::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRB2501",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC06400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC06400",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC06400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC06400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKCM2592::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCM2592",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKCM2592::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCM2592",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCV39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCV39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CRC00373::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00373",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00373::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00373",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIZ362::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIZ362",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CRC02400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02400",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00848::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00848",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BWS00131::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BWS00131",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEWBR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00988::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00988",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSD00070::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSD00070",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC04500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC04500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECFC00000000D0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCL39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCL39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "BSI00438::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00438",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMRG39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMRG39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CRC03500::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03500",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02800::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02800",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIF462::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIF462",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CRC01810::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01810",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01810::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01810",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00567::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00567",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00567::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00567",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00571::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00571",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00388::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00388",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIRP38::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIRP38",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "BWS00129::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BWS00129",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEWBR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01200",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02300",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMRB39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMRB39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "PRIIF162::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIF162",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "COR00807::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00807",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC04488::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC04488",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECFC00000000D0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00719::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00719",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIBP49::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIBP49",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CRC05600::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC05600",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00399::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00399",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00399::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00399",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD00800::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD00800",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD00800::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD00800",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMC061::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC061",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSC99346::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC99346",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECFC00000000D0000000001011970.png"
        };
        return cardArt;
    },
    "CSC03600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC03600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00610::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00610",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00610::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00610",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKRB2591::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRB2591",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKRB2591::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRB2591",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR214::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR214",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "CRC00900::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00900",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00900::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00900",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00472::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00472",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECFC00000000D0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00400",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00346::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00346",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECFC00000000D0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01388::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01388",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01388::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01388",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00800::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00800",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00800::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00800",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00751::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00751",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00544::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00544",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD01100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD01100",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD01100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD01100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKRM2502::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRM2502",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKRM2502::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRM2502",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSD00188::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSD00188",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSD00400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSD00400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIZ462::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIZ462",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CRC03200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03200",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKCB2501::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCB2501",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKCB2501::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCB2501",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIZ162::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIZ162",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "GSC00799::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00799",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00799::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00799",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00569::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00569",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC06100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC06100",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC06100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC06100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00500::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00500",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCK40::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCK40",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "COR00229::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00229",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00431::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00431",
            circuit: "VISA",
            url: "assets/card-arts/VVABX00030000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRD01200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD01200",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD01200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD01200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIBM49::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIBM49",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "PRIMC059::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC059",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCH39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCH39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "GSC00542::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00542",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00599::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00599",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00599::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00599",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCB39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCB39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "GSD00200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSD00200",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSD00200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSD00200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00699::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00699",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00699::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00699",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00800::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00800",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02700::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02700",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC05700::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC05700",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC05700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC05700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01800::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01800",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01800::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01800",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCN41::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCN41",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSC01688::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01688",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMW043::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMW043",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "GSC02600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00700::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00700",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01700::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01700",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00443::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00443",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01288::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01288",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02099::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02099",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02099::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02099",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03600::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03600",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR213::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR213",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "COR00899::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00899",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03300",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00796::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00796",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKGC2504::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKGC2504",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PKGC2504::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKGC2504",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00585::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00585",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02600::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02600",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00999::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00999",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC05900::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC05900",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC05900::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC05900",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02288::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02288",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02288::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02288",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIIBN38::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIIBN38",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "CSC01000::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01000",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01000::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01000",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00603::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00603",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00918::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00918",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01000::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01000",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00650::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00650",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00989::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00989",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00602::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00602",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00813::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00813",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00882::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00882",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00974::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00974",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00200",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00993::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00993",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00971::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00971",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00665::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00665",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC04400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC04400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECFC00000000D0000000001011970.png"
        };
        return cardArt;
    },
    "COR00752::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00752",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKCBPP01::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCBPP01",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00669::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00669",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00984::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00984",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKGCPP04::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKGCPP04",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00031::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00031",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKRM2592::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRM2592",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKRM2592::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRM2592",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCK39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCK39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "ASC00157::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00157",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC04600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC04600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECFC00000000D0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00388::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00388",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00972::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00972",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00471::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00471",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSD00199::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSD00199",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSD00199::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSD00199",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00228::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00228",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00804::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00804",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKGPPP03::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKGPPP03",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00584::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00584",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00892::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00892",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "BWS00392::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BWS00392",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEWBR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00767::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00767",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00961::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00961",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01400",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC02088::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC02088",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00200",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00660::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00660",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00608::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00608",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00843::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00843",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00843::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00843",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00962::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00962",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKGP2503::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKGP2503",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PKGP2503::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKGP2503",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKRP2503::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRP2503",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKRP2503::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRP2503",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00432::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00432",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00771::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00771",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00697::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00697",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00826::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00826",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00944::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00944",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC91700::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC91700",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC91700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC91700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00434::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00434",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BSI00434::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00434",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00786::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00786",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC03300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC03300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00649::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00649",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03800::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03800",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03800::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03800",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSS01100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS01100",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02200",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BWS00393::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BWS00393",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEWBR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00651::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00651",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00756::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00756",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00845::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00845",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00980::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00980",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00588::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00588",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00610::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00610",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC04000::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC04000",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC04000::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC04000",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR204::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR204",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "COR00055::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00055",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00605::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00605",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00776::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00776",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00879::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00879",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00942::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00942",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRD01400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD01400",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD01400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD01400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00888::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00888",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00014::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00014",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00656::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00656",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00841::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00841",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00871::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00871",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00606::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00606",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00583::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00583",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMC139::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC139",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "COR00034::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00034",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00045::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00045",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00613::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00613",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00881::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00881",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00935::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00935",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC04600::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC04600",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC04600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC04600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKRP2593::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRP2593",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKRP2593::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRP2593",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00060::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00060",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00609::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00609",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00616::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00616",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00633::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00633",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00772::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00772",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00781::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00781",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00784::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00784",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00945::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00945",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00410::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00410",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC00410::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC00410",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKCB2591::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCB2591",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKCB2591::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCB2591",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMC539::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC539",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "COR00048::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00048",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00061::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00061",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00761::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00761",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00988::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00988",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00899::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00899",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00899::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00899",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC99600::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC99600",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC99600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC99600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00659::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00659",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00703::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00703",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00730::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00730",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00800::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00800",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC00488::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC00488",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00696::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00696",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01299::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01299",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01299::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01299",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC03500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC03500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSD00288::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSD00288",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "BWS00859::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BWS00859",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEWBR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00032::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00032",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00077::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00077",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00671::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00671",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00780::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00780",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00808::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00808",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00815::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00815",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00916::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00916",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00948::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00948",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00970::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00970",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00996::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00996",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC03400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC03400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00033::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00033",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00711::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00711",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00777::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00777",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00787::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00787",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00933::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00933",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00938::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00938",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00960::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00960",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00973::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00973",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC06200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC06200",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC06200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC06200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRS00200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRS00200",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRS00200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRS00200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01900::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01900",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC03200::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC03200",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC03200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC03200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00049::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00049",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00644::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00644",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00657::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00657",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00753::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00753",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00783::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00783",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00842::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00842",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00937::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00937",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00978::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00978",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRD01000::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD01000",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD01000::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD01000",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKCC2594::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCC2594",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKCC2594::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKCC2594",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PKGB2501::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKGB2501",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00137::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00137",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00568::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00568",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00568::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00568",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUS555::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUS555",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        }

        if (expiryDate && isInRange(expiryDate, "1900-01-01", "2026-11-30")) {
            cardArt.url = "assets/card-arts/VDBR538700000B0000000001011970.png";
        }

        return cardArt;
    },
    "COR00218::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00218",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00727::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00727",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00731::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00731",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00732::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00732",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00758::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00758",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00790::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00790",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00897::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00897",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00926::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00926",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00946::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00946",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00958::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00958",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00995::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00995",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKRC2504::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRC2504",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKRC2504::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRC2504",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00052::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00052",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00059::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00059",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00071::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00071",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00604::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00604",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00653::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00653",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00666::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00666",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00794::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00794",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00802::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00802",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00896::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00896",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00902::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00902",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00927::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00927",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00969::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00969",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00986::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00986",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00997::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00997",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00998::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00998",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSS99100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS99100",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSS99100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS99100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "BWS00132::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BWS00132",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEWBR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00012::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00012",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00025::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00025",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00039::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00039",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00641::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00641",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00722::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00722",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00908::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00908",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00966::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00966",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00975::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00975",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02499::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02499",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02499::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02499",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00900::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00900",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMC043::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC043",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "COR00053::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00053",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00629::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00629",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00694::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00694",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00721::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00721",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00769::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00769",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00885::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00885",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00898::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00898",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00931::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00931",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00950::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00950",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00983::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00983",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSS01200::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS01200",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00860::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00860",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC00888::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC00888",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PKGC2594::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKGC2594",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMCG61::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMCG61",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "BSI00380::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00380",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BWS00395::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BWS00395",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEWBR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "BWS00857::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BWS00857",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEWBR00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00054::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00054",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00627::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00627",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00658::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00658",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00668::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00668",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00718::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00718",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCS00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00725::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00725",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00765::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00765",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00766::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00766",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00798::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00798",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00824::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00824",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00835::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00835",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00847::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00847",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00956::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00956",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00979::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00979",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC03400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC03400",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC05300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC05300",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00047::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00047",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00057::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00057",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00230::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00230",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00607::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00607",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00640::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00640",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00654::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00654",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00695::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00695",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCS00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00707::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00707",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00733::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00733",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00764::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00764",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00785::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00785",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00791::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00791",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00812::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00812",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00819::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00819",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00828::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00828",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00939::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00939",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00955::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00955",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00982::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00982",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00985::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00985",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRD01300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD01300",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRD01300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRD01300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01300",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC99500::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC99500",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC99500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC99500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRNC0034::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRNC0034",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "BSI00436::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BSI00436",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00044::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00044",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00565::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00565",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00631::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00631",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00663::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00663",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00710::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00710",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00717::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00717",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MECCS00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00759::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00759",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00773::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00773",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00801::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00801",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00817::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00817",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00834::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00834",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00888::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00888",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00891::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00891",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00903::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00903",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00922::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00922",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00923::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00923",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00924::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00924",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00936::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00936",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00949::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00949",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00957::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00957",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00959::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00959",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00976::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00976",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00981::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00981",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00987::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00987",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00992::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00992",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00288::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00288",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC01700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC01700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMC339::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMC339",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "ASC00555::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00555",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00563::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00563",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00614::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00614",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00625::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00625",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00634::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00634",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00648::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00648",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00726::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00726",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00757::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00757",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00792::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00792",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00810::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00810",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00825::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00825",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00832::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00832",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00838::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00838",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00873::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00873",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00884::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00884",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00887::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00887",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00904::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00904",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00912::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00912",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00920::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00920",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00947::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00947",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00952::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00952",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00953::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00953",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01410::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01410",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01410::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01410",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02500::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02500",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC02500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC02500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSS01000::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS01000",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02300",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PRIMRV40::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMRV40",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "ASC00564::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00564",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00564::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00564",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "COR00051::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00051",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00079::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00079",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00083::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00083",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00630::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00630",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00664::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00664",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00706::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00706",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00782::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00782",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00799::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00799",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00805::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00805",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00901::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00901",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00909::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00909",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00915::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00915",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00928::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00928",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00943::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00943",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01210::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01210",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CRC01210::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC01210",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC06500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC06500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01188::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01188",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC03300::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC03300",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC03300::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC03300",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "CSS00900::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSS00900",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC88500::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC88500",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC88500::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC88500",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKGBPP01::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKGBPP01",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKRC2594::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRC2594",
            circuit: "VISA",
            url: "assets/card-arts/VVRCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "PKRC2594::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKRC2594",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "ASC00591::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC00591",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPIDM080::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPIDM080",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MBA0538700140.png"
        };
        return cardArt;
    },
    "BPIDV080::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPIDV080",
            circuit: "VISA",
            url: "assets/card-arts/VBA0538700130.png"
        };
        return cardArt;
    },
    "COR00566::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00566",
            circuit: "VISA",
            url: "assets/card-arts/VVCCR00000000C0000000001011970.png"
        };
        return cardArt;
    },
    "COR00626::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00626",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00632::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00632",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00661::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00661",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00705::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00705",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00795::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00795",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00906::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00906",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00917::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00917",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "COR00929::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "COR00929",
            circuit: "VISA",
            url: "assets/card-arts/VVCSX00000000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC06600::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC06600",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CRC06700::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CRC06700",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MERSR53870000A0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01788::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01788",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC01888::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC01888",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC03100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC03100",
            circuit: "VISA",
            url: "assets/card-arts/VVSCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "CSC03100::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "CSC03100",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESCR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02400::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02400",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02400::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02400",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MESGR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "GSC02488::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "GSC02488",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "MFC00735::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "MFC00735",
            circuit: "VISA",
            url: "assets/card-arts/VVKNS10150000A0000000001011970.png"
        };
        return cardArt;
    },
    "MFC00735::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "MFC00735",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEKNS10150000A0000000001011970.png"
        };
        return cardArt;
    },
    "MFC00736::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "MFC00736",
            circuit: "VISA",
            url: "assets/card-arts/VVKNS10150000A0000000001011970.png"
        };
        return cardArt;
    },
    "MFC00736::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "MFC00736",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MEKNS10150000A0000000001011970.png"
        };
        return cardArt;
    },
    "PKGM2502::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PKGM2502",
            circuit: "VISA",
            url: "assets/card-arts/VVSGR53870000C0000000001011970.png"
        };
        return cardArt;
    },
    "PRIBRA39::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIBRA39",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "PRIMRH40::MASTERCARD": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "PRIMRH40",
            circuit: "MASTERCARD",
            url: "assets/card-arts/MDEFA5267360000000000001011970.png"
        };
        return cardArt;
    },
    "ASC90100::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "ASC90100",
            circuit: "VISA",
            url: "assets/card-arts/VVBCR53870000B0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUA611::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUA611",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUZ611::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUZ611",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUA621::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUA621",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUZ621::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUZ621",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR721::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR721",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        };
        return cardArt;
    },
    "BPEUR725::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "BPEUR725",
            circuit: "VISA",
            url: "assets/card-arts/VDBR538700000A0000000001011970.png"
        };
        return cardArt;
    },
    // Carige cards
    "NPAVMG::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "NPAVMG",
            circuit: "VISA",
            url: "assets/card-arts/NPAVMG_Carige_Pay_Prepaid_Visa.png"
        };

        if( environment.BCPAbi == abi ) {
            cardArt.url = "assets/card-arts/NPAVMG_Card_Pontipay_prepaid.png";
        }

        return cardArt;
    },
    "NPAVMN::VISA": ({ expiryDate = '', abi = '' } = {}) => {
        let cardArt = {
            id: "00",
            productCode: "NPAVMN",
            circuit: "VISA",
            url: "assets/card-arts/NPAVMN_Carige_Pay_Young_Prepaid_Visa.png"
        };
        return cardArt;
    },
}