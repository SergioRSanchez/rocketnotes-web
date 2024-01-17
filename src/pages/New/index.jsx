import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { api } from '../../services/api';

import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Section } from '../../components/Section';
import { NoteItem } from '../../components/NoteItem';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';

import { Container, Form } from './styles';

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(linkDeleted) {
    setLinks(prevState => prevState.filter(link => link !== linkDeleted))
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(tagDeleted) {
    setTags(prevState => prevState.filter(tag => tag !== tagDeleted))
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Digite o título da nota.")
    }

    // if (!description) {
    //   return alert("Digite uma observação para nota.")
    // }

    if (!newLink && links.length === 0) {
      return alert("Digite um link para nota.")
    }

    if (!newTag && tags.length === 0) {
      return alert("Digite uma tag para nota.")
    }

    if (newLink) {
      return alert("Você deixou um link no campo para adicionar, mas não confirmou. Clique para confirmar ou deixa o campo vazio")
    }

    if (newTag) {
      return alert("Você deixou uma tag no campo para adicionar, mas não confirmou. Clique para confirmar ou deixa o campo vazio")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Nota criada com sucesso!");
    navigate(-1);
  }

  function handleBack() {
    navigate(-1);
  };

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={handleBack} />
          </header>

          <Input
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Observações"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">

            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => { handleRemoveLink(link) }}
                />
              ))
            }
            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />

          </Section>

          <Section title="Marcadores">
            <div className="tags">

              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => { handleRemoveTag(tag) }}
                  />
                ))
              }

              <NoteItem
                isNew
                placeholder="Nova tag"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />

            </div>
          </Section>

          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  )
}