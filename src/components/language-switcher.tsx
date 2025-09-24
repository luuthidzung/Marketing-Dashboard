import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Check, Globe } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
    { code: 'en', name: 'English' },
    { code: 'vi', name: 'Tiếng Việt' },
];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const currentLanguage = languages.find(
        (language) => language.code === i18n.language
    ) || languages[0];

    const handleLanguageChange = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
        setOpen(false);
    };

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>{currentLanguage.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className="flex items-center justify-between"
                    >
                        <span>{language.name}</span>
                        {language.code === i18n.language && (
                            <Check className="h-4 w-4 ml-2" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}


