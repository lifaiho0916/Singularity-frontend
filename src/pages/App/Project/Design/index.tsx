import { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { CascadeSelect } from "primereact/cascadeselect";
import { Button } from 'primereact/button';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ViewBox, Toolbar, ButtonComponent, TextComponent, LabelComponent, ImageComponent, Element, LabelComponentDialog, TextComponentDialog, ButtonComponentDialog, ImageComponentDialog } from 'components';
import { useSelector } from 'react-redux';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Divider } from 'primereact/divider';
import { setStructure } from 'store/slices/projectSlice';
import { notify } from 'store/slices/toastSlice';
import type { RootState } from 'store';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "constants/";
import { IElement, IComponentType, IStructure } from 'libs/types';
import { v4 as uuidv4 } from 'uuid'

const DesignWorkspace = () => {
  const dispatch = useDispatch();
  const { structure } = useSelector((state: RootState) => state.project)
  const [zoom, setZoom] = useState(1);
  const [responsive, setResponsive] = useState('mobile');
  const [design, setDesign] = useState<any>(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [page, setPage] = useState<any>(null);
  const [currentToolId, selectTool] = useState(0);
  const [isToolItemSelected, setToolItemSelected] = useState(false);
  const [isOpenAddScreenModal, setIsOpenAddScreenModal] = useState(false);
  const [newScreenName, setNewscreenName] = useState('');

  const rootElement: IElement = {
    id: uuidv4(),
    parent: '',
    name: 'root',
    style: { backgroundColor: 'lightgray', color: 'white' },
    child: [],
    type: IComponentType.Wrapper,
    action: () => {
      console.log('Button clicked!');
    }, // Added closing parenthesis and semicolon
  };
  const allElements: Array<IElement> = [rootElement]

  const toolSelected = (value: number) => {
    console.log(`Toolbar Item ${value} selected`)
    setToolItemSelected(true)
    selectTool(value)
  }

  useEffect(() => {
    if (structure) {
      setDesign(structure.project.design)
    }
  }, [structure])

  useEffect(() => {
    if (page === null && design) {
      setPage(design.pages[pageIndex])
    }
  }, [design, page])

  const getCurrentComponent = () => {
    console.log(currentToolId, " item selected");
    switch (currentToolId) {
      case 0: return <ButtonComponent />
      case 1: return <TextComponent />
      case 2: return <LabelComponent />
      case 3: return <ImageComponent />
    }
  }

  const getCurrentPropertyDialog = () => {
    switch (currentToolId) {
      case 0: return <ButtonComponentDialog />
      case 1: return <TextComponentDialog />
      case 2: return <LabelComponentDialog />
      case 3: return <ImageComponentDialog />
    }
  }

  const AddNewScreenBtnClick = () => {
    setNewscreenName('')
    setIsOpenAddScreenModal(true);
  }

  const AddNewScreen = () => {
    if (newScreenName === '') {
      dispatch(notify({
        title: '',
        content: 'New Screen Name is required',
        type: 'error'
      }))
      return
    }
    const newPage = {
      name: newScreenName,
      defaultView: {
        name: 'main view',
        align: {
          vertical: 'center',
          horizontal: 'center'
        },
        content: []
      }
    }

    const updateStructure = {
      ...structure,
      project: {
        ...structure?.project,
        design: {
          ...structure?.project.design,
          pages: [
            ...structure?.project.design.pages,
            newPage
          ]
        }
      }
    }
    dispatch(setStructure(updateStructure as IStructure));
    setIsOpenAddScreenModal(false);
  }

  const screens = useMemo(() => {
    if (design) {
      return design.pages.map((pg: any, index: number) => (
        {
          index: index,
          name: pg.name
        }
      ))
    } else {
      return []
    }
  }, [design])

  return (
    <div className="design-workspace ">
      <div className='workspace-header'>
        <div className='responsive-tool'>
          <Button
            icon="pi pi-desktop" text
            raised={responsive === 'desktop'}
            onClick={() => setResponsive('desktop')}
          />
          <Button
            icon="pi pi-tablet" text
            raised={responsive === 'tablet'}
            onClick={() => setResponsive('tablet')}
          />
          <Button
            icon="pi pi-mobile" text
            raised={responsive === 'mobile'}
            onClick={() => setResponsive('mobile')}
          />
        </div>
        <div className='view-tool'>
          <CascadeSelect
            value={`${zoom * 100}%`}
            onChange={(e) => {
              setZoom(Number(e.value.substring(0, e.value.length - 1)) / 100);
            }}
            options={['50%', '75%', '100%', '125%', '150%']}
            optionGroupChildren={[]}
          />
        </div>
      </div>

      <div className="workspace-body">
        <div className="screen-view">
          <h3>Screens</h3>
          <Divider className="custom-divider" />
          {screens.map((screen: any, index: number) => (
            <div className="screen" key={index}>
              <RadioButton inputId={`screen${index}`} value={screen.index} onChange={(e) => setPageIndex(Number(e.value))} checked={pageIndex === index} />
              <label htmlFor={`screen${index}`}>{screen.name}</label>
            </div>
          ))}
          <Divider className="custom-divider" />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button size='small' raised onClick={AddNewScreenBtnClick}>New Screen</Button>
          </div>
        </div>
        <Toolbar items={["Button", "Text", "Label", "Image"]} onClicked={toolSelected} />
        <div style={{ width: DEFAULT_WIDTH * zoom, height: DEFAULT_HEIGHT * zoom }} className="main-view">
          <Element item={rootElement} />
          {isToolItemSelected && getCurrentComponent()}
        </div>
        {isToolItemSelected && getCurrentPropertyDialog()}
      </div>
      <Dialog
        header="New Screen"
        visible={isOpenAddScreenModal}
        style={{ width: 300 }}
        onHide={() => setIsOpenAddScreenModal(false)}
        draggable={false}
      >
        <InputText
          type='text'
          value={newScreenName}
          placeholder='New Screen Name'
          onChange={(e) => {
            setNewscreenName(e.target.value)
          }}
        />
        <Divider />
        <Button
          severity="info"
          raised
          size='small'
          style={{ width: '100%', }}
          onClick={AddNewScreen}
        >
          <span style={{ textAlign: 'center', width: '100%' }}>Add</span>
        </Button>

      </Dialog>
    </div>
  )
}

export default DesignWorkspace;